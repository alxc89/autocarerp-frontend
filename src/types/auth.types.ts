// Authentication Request/Response types matching backend DTOs

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    role: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

export interface AuthResponse {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
}

export interface User {
    email: string;
    username: string;
    roles: string[];
    permissions: string[];
}


export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
}
