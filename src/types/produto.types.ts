// ProdutoServico types matching backend DTOs

export interface ProdutoServicoCreateDto {
    nome: string;
    descricao: string;
    fornecedor?: string | null;
    custo?: number | null;
    valor: number;
}

export interface ProdutoServicoReadDto {
    codigo: number;
    nome: string;
    descricao: string;
    fornecedor: string;
    custo?: number | null;
    valor: number;
}

export interface ProdutoServicoUpdateDto {
    nome: string;
    descricao: string;
    fornecedor?: string | null;
    custo?: number | null;
    valor: number;
}

export interface ProdutoServicoListParams {
    search?: string;
    page?: number;
    pageSize?: number;
}
