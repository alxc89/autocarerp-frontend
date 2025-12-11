// Generic API response types
export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// API Error response
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
}

// Generic API response wrapper
export interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
    success: boolean;
}
