import apiClient from '@/lib/api-client';
import type {
    ClienteCreateDto,
    ClienteReadDto,
    ClienteUpdateDto,
    ClienteListParams,
} from '@/types/cliente.types';
import type { PaginatedResponse } from '@/types/api.types';

/**
 * Cliente Service
 * Handles all API calls for Cliente endpoints
 */
class ClienteService {
    private readonly basePath = '/Cliente';

    /**
     * Create a new cliente
     */
    async create(data: ClienteCreateDto): Promise<ClienteReadDto> {
        const response = await apiClient.post<ClienteReadDto>(
            `${this.basePath}/create`,
            data
        );
        return response.data;
    }

    /**
     * Get cliente by codigo
     */
    async getById(codigo: number): Promise<ClienteReadDto> {
        const response = await apiClient.get<ClienteReadDto>(
            `${this.basePath}/get-by-cod/${codigo}`
        );
        return response.data;
    }

    /**
     * List all clientes with pagination and search
     */
    async getAll(
        params: ClienteListParams = {}
    ): Promise<PaginatedResponse<ClienteReadDto>> {
        const { search = '', page = 1, pageSize = 20 } = params;

        const response = await apiClient.get<PaginatedResponse<ClienteReadDto>>(
            `${this.basePath}/get-all`,
            {
                params: { search, page, pageSize },
            }
        );
        return response.data;
    }

    /**
     * Update an existing cliente
     */
    async update(
        codigo: number,
        data: ClienteUpdateDto
    ): Promise<ClienteReadDto> {
        const response = await apiClient.put<ClienteReadDto>(
            `${this.basePath}/update/${codigo}`,
            data
        );
        return response.data;
    }

    /**
     * Delete a cliente
     */
    async delete(codigo: number): Promise<void> {
        await apiClient.delete(`${this.basePath}/delete/${codigo}`);
    }
}

export default new ClienteService();
