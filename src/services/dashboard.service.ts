import apiClient from '@/lib/api-client';
import type { DashboardStatsDto, RecentOrdemServicoDto } from '@/types/dashboard.types';

/**
 * Dashboard Service
 * Handles API calls for dashboard statistics and recent orders
 */
class DashboardService {
    private readonly basePath = '/Dashboard';

    /**
     * Get dashboard statistics
     */
    async getStats(): Promise<DashboardStatsDto> {
        const response = await apiClient.get<DashboardStatsDto>(
            `${this.basePath}/stats`
        );
        return response.data;
    }

    /**
     * Get recent orders (ordens de serviço)
     */
    async getRecentOrders(limit: number = 10): Promise<RecentOrdemServicoDto[]> {
        const response = await apiClient.get<RecentOrdemServicoDto[]>(
            `${this.basePath}/recent-orders`,
            {
                params: { limit },
            }
        );
        return response.data;
    }
}

export default new DashboardService();
