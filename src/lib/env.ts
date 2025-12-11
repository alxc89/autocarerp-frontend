// Environment configuration with validation and defaults
export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5163/api/v1',
} as const;

// Validate required environment variables
if (!env.apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL environment variable is required');
}

export default env;
