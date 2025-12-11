import apiClient from '@/lib/api-client';
import type {
    OrdemDeServicoCreateDto,
    OrdemDeServicoReadDto,
    OrdemDeServicoUpdateDto,
    OrdemDeServicoListParams,
} from '@/types/ordem-servico.types';
import type { PaginatedResponse } from '@/types/api.types';

/**
 * OrdemDeServico Service
 * Handles all API calls for OrdemDeServico endpoints
 */
class OrdemDeServicoService {
    private readonly basePath = '/OrdemDeServico';

    /**
     * Create a new ordem de servico
     */
    async create(
        data: OrdemDeServicoCreateDto
    ): Promise<OrdemDeServicoReadDto> {
        const response = await apiClient.post<OrdemDeServicoReadDto>(
            `${this.basePath}/create`,
            data
        );
        return response.data;
    }

    /**
     * Get ordem de servico by codigo (ID)
     */
    async getById(codigo: number): Promise<OrdemDeServicoReadDto> {
        const response = await apiClient.get<OrdemDeServicoReadDto>(
            `${this.basePath}/get-by-cod/${codigo}`
        );
        return response.data;
    }

    /**
     * List all ordens de servico with pagination and search
     */
    async getAll(
        params: OrdemDeServicoListParams = {}
    ): Promise<PaginatedResponse<OrdemDeServicoReadDto>> {
        const { search = '', page = 1, pageSize = 20 } = params;

        const response = await apiClient.get<
            PaginatedResponse<OrdemDeServicoReadDto>
        >(`${this.basePath}/get-all`, {
            params: { search, page, pageSize },
        });
        return response.data;
    }

    /**
     * Update an existing ordem de servico
     */
    async update(
        codigo: number,
        data: OrdemDeServicoUpdateDto
    ): Promise<OrdemDeServicoReadDto> {
        const response = await apiClient.put<OrdemDeServicoReadDto>(
            `${this.basePath}/update/${codigo}`,
            data
        );
        return response.data;
    }

    /**
     * Delete an ordem de servico
     */
    async delete(codigo: number): Promise<void> {
        await apiClient.delete(`${this.basePath}/delete/${codigo}`);
    }
}

export default new OrdemDeServicoService();
