import { useAuthStore } from '@/stores/auth.store';

/**
 * Custom hook to access authentication state and actions
 */
export const useAuth = () => {
    const {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        clearError,
        initialize,
    } = useAuthStore();

    /**
     * Check if user has a specific permission
     */
    const hasPermission = (permission: string): boolean => {
        if (!user) return false;
        return user.permissions.includes(permission);
    };

    /**
     * Check if user has a specific role
     */
    const hasRole = (role: string): boolean => {
        if (!user) return false;
        return user.roles.includes(role.toUpperCase());
    };

    /**
     * Check if user has any of the specified roles
     */
    const hasAnyRole = (roles: string[]): boolean => {
        if (!user) return false;
        return roles.some((role) => user.roles.includes(role.toUpperCase()));
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        clearError,
        initialize,
        hasPermission,
        hasRole,
        hasAnyRole,
    };
};
