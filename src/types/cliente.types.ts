// Cliente types matching backend DTOs

export interface ClienteCreateDto {
    nome: string;
    telefone?: string | null;
    cpfCnpj?: string | null;
    endereco?: string | null;
    email?: string | null;
}

export interface ClienteReadDto {
    codigo: number;
    nome: string;
    telefone?: string | null;
    cpfCnpj?: string | null;
    endereco?: string | null;
    email?: string | null;
}

export interface ClienteUpdateDto {
    nome: string;
    telefone?: string | null;
    cpfCnpj?: string | null;
    endereco?: string | null;
    email?: string | null;
}

export interface ClienteListParams {
    search?: string;
    page?: number;
    pageSize?: number;
}
