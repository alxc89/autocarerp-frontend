import apiClient from '@/lib/api-client';

export interface UpdateProfileRequest {
    nome: string;
    email: string;
}

export interface ChangePasswordRequest {
    senhaAtual: string;
    novaSenha: string;
}

export interface UserPreferences {
    tema: 'light' | 'dark';
    idioma: 'pt-BR' | 'en-US';
    notificarOsAtrasada: boolean;
}

class UserService {
    async updateProfile(data: UpdateProfileRequest): Promise<{ message: string }> {
        const response = await apiClient.put<{ message: string }>('/User/profile', data);
        return response.data;
    }

    async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>('/User/change-password', data);
        return response.data;
    }

    async getPreferences(): Promise<UserPreferences> {
        const response = await apiClient.get<UserPreferences>('/User/preferences');
        return response.data;
    }

    async updatePreferences(data: UserPreferences): Promise<{ message: string }> {
        const response = await apiClient.put<{ message: string }>('/User/preferences', data);
        return response.data;
    }
}

export default new UserService();
