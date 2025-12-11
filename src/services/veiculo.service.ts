import apiClient from '@/lib/api-client';
import type {
    VeiculoCreateDto,
    VeiculoReadDto,
    VeiculoUpdateDto,
    VeiculoListParams,
} from '@/types/veiculo.types';
import type { PaginatedResponse } from '@/types/api.types';

/**
 * Veiculo Service
 * Handles all API calls for Veiculo endpoints
 */
class VeiculoService {
    private readonly basePath = '/Veiculo';

    /**
     * Create a new veiculo
     */
    async create(data: VeiculoCreateDto): Promise<VeiculoReadDto> {
        const response = await apiClient.post<VeiculoReadDto>(
            `${this.basePath}/create`,
            data
        );
        return response.data;
    }

    /**
     * Get veiculo by codigo (ID)
     */
    async getById(codigo: number): Promise<VeiculoReadDto> {
        const response = await apiClient.get<VeiculoReadDto>(
            `${this.basePath}/get-by-cod/${codigo}`
        );
        return response.data;
    }

    /**
     * Get veiculo by placa
     */
    async getByPlaca(placa: string): Promise<VeiculoReadDto> {
        const response = await apiClient.get<VeiculoReadDto>(
            `${this.basePath}/get-by-placa/${placa}`
        );
        return response.data;
    }

    /**
     * List all veiculos with pagination and search
     */
    async getAll(
        params: VeiculoListParams = {}
    ): Promise<PaginatedResponse<VeiculoReadDto>> {
        const { search = '', page = 1, pageSize = 20 } = params;

        const response = await apiClient.get<PaginatedResponse<VeiculoReadDto>>(
            `${this.basePath}/get-all`,
            {
                params: { search, page, pageSize },
            }
        );
        return response.data;
    }

    /**
     * Update an existing veiculo
     */
    async update(
        codigo: number,
        data: VeiculoUpdateDto
    ): Promise<VeiculoReadDto> {
        const response = await apiClient.put<VeiculoReadDto>(
            `${this.basePath}/update/${codigo}`,
            data
        );
        return response.data;
    }

    /**
     * Delete a veiculo
     */
    async delete(codigo: number): Promise<void> {
        await apiClient.delete(`${this.basePath}/delete/${codigo}`);
    }
}

export default new VeiculoService();
