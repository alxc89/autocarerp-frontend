import apiClient, { setTokens, clearTokens, getAccessToken } from '@/lib/api-client';
import type {
    LoginRequest,
    RegisterRequest,
    RefreshRequest,
    AuthResponse,
    User,
} from '@/types/auth.types';

/**
 * Authentication Service
 * Handles login, register, refresh token, and token management
 */
class AuthService {
    /**
     * Login user with email and password
     */
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/Auth/login', {
            email,
            password,
        } as LoginRequest);

        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);

        return response.data;
    }

    /**
     * Register a new user (Admin only)
     */
    async register(data: RegisterRequest): Promise<void> {
        await apiClient.post('/Auth/register', data);
    }

    /**
     * Refresh access token using refresh token
     */
    async refresh(refreshToken: string): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/Auth/refresh', {
            refreshToken,
        } as RefreshRequest);

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data;
        setTokens(newAccessToken, newRefreshToken);

        return response.data;
    }

    /**
     * Logout user and clear tokens
     */
    logout(): void {
        clearTokens();
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!getAccessToken();
    }

    /**
     * Decode JWT token to extract user information
     */
    decodeToken(token: string): User | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            const payload = JSON.parse(jsonPayload);

            // Extract user information from JWT claims
            return {
                email: payload.email || payload.sub,
                username: payload.unique_name || payload.name || payload.email || 'Usuário',
                roles: payload.role ? (Array.isArray(payload.role) ? payload.role : [payload.role]) : [],
                permissions: payload.permission
                    ? Array.isArray(payload.permission)
                        ? payload.permission
                        : [payload.permission]
                    : [],
            };
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    /**
     * Get current user from token
     */
    getCurrentUser(): User | null {
        const token = getAccessToken();
        if (!token) return null;
        return this.decodeToken(token);
    }
}

export default new AuthService();
