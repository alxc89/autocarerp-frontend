// OrdemDeServico types matching backend DTOs

export interface OrdemDeServicoCreateDto {
    horaAbertura: string; // ISO string format
    horaFechamento?: string | null;
    veiculoId: number;
    clienteId: number;
    produtoServicoId: number;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    observacao?: string | null;
    status: string;
}

export interface OrdemDeServicoReadDto {
    codigo: number;
    horaAbertura: string;
    horaFechamento?: string;
    veiculoId: number;
    veiculoPlaca: string;
    veiculoModelo: string;
    clienteId: number;
    clienteNome: string;
    produtoServicoId: number;
    produtoServicoNome: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    observacao: string;
    status: string;
}

export interface OrdemDeServicoUpdateDto {
    horaAbertura: string;
    horaFechamento?: string | null;
    veiculoId: number;
    clienteId: number;
    produtoServicoId: number;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    observacao?: string | null;
    status: string;
}

export interface OrdemDeServicoListParams {
    search?: string;
    page?: number;
    pageSize?: number;
}
