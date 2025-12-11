// Dashboard types matching backend DTOs

export interface DashboardStatsDto {
    totalClientes: number;
    totalVeiculos: number;
    osAberta: number;
    osEmAndamento: number;
    osAtrasada: number;
    faturamentoMes: number;
}

export interface RecentOrdemServicoDto {
    codigo: number;
    clienteNome: string;
    status: string;
    horaAbertura: string;
}
