import apiClient from '@/lib/api-client';
import type {
    ProdutoServicoCreateDto,
    ProdutoServicoReadDto,
    ProdutoServicoUpdateDto,
    ProdutoServicoListParams,
} from '@/types/produto.types';
import type { PaginatedResponse } from '@/types/api.types';

/**
 * ProdutoServico Service
 * Handles all API calls for ProdutoServico endpoints
 */
class ProdutoServicoService {
    private readonly basePath = '/ProdutoServico';

    /**
     * Create a new produto/servico
     */
    async create(data: ProdutoServicoCreateDto): Promise<ProdutoServicoReadDto> {
        const response = await apiClient.post<ProdutoServicoReadDto>(
            `${this.basePath}/create`,
            data
        );
        return response.data;
    }

    /**
     * Get produto/servico by codigo (ID)
     */
    async getById(codigo: number): Promise<ProdutoServicoReadDto> {
        const response = await apiClient.get<ProdutoServicoReadDto>(
            `${this.basePath}/get-by-cod/${codigo}`
        );
        return response.data;
    }

    /**
     * List all produtos/servicos with pagination and search
     */
    async getAll(
        params: ProdutoServicoListParams = {}
    ): Promise<PaginatedResponse<ProdutoServicoReadDto>> {
        const { search = '', page = 1, pageSize = 20 } = params;

        const response = await apiClient.get<
            PaginatedResponse<ProdutoServicoReadDto>
        >(`${this.basePath}/get-all`, {
            params: { search, page, pageSize },
        });
        return response.data;
    }

    /**
     * Update an existing produto/servico
     */
    async update(
        codigo: number,
        data: ProdutoServicoUpdateDto
    ): Promise<ProdutoServicoReadDto> {
        const response = await apiClient.put<ProdutoServicoReadDto>(
            `${this.basePath}/update/${codigo}`,
            data
        );
        return response.data;
    }

    /**
     * Delete a produto/servico
     */
    async delete(codigo: number): Promise<void> {
        await apiClient.delete(`${this.basePath}/delete/${codigo}`);
    }
}

export default new ProdutoServicoService();
