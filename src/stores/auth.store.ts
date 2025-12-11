import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '@/services/auth.service';
import type { User } from '@/types/auth.types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
    initialize: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    await authService.login(email, password);
                    const user = authService.getCurrentUser();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    const errorMessage =
                        error.response?.data?.message ||
                        error.response?.data ||
                        'Erro ao fazer login. Por favor, tente novamente.';
                    set({ error: errorMessage, isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                authService.logout();
                set({ user: null, isAuthenticated: false, error: null });
            },

            setUser: (user: User | null) => {
                set({ user, isAuthenticated: !!user });
            },

            initialize: () => {
                if (authService.isAuthenticated()) {
                    const user = authService.getCurrentUser();
                    set({ user, isAuthenticated: !!user });
                } else {
                    set({ user: null, isAuthenticated: false });
                }
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
