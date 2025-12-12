import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import env from './env';

// Create Axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

// Token management
let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
};

export const getAccessToken = (): string | null => {
    if (!accessToken) {
        accessToken = localStorage.getItem('accessToken');
    }
    return accessToken;
};

export const getRefreshToken = (): string | null => {
    if (!refreshToken) {
        refreshToken = localStorage.getItem('refreshToken');
    }
    return refreshToken;
};

export const clearTokens = () => {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
};

// Request interceptor: Add JWT token to headers
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: Handle errors and refresh token
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // Handle 401 Unauthorized - Attempt token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue this request while refresh is in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const currentRefreshToken = getRefreshToken();

            if (!currentRefreshToken) {
                clearTokens();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // Attempt to refresh the token
                const response = await axios.post(
                    `${env.apiBaseUrl}/Auth/refresh`,
                    { refreshToken: currentRefreshToken },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
                    response.data;

                setTokens(newAccessToken, newRefreshToken);
                processQueue(null, newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as Error, null);
                clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Handle other errors
        if (error.response?.status === 403) {
            console.error('Access forbidden - insufficient permissions');
        }

        if (error.response?.status === 500) {
            console.error('Internal server error');
        }

        return Promise.reject(error);
    }
);

export default apiClient;
