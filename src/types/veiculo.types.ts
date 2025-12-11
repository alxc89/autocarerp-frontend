// Veiculo types matching backend DTOs

export interface VeiculoCreateDto {
    placa: string;
    marca: string;
    modelo: string;
    cor: string;
    ano: number;
}

export interface VeiculoReadDto {
    codigo: number;
    placa: string;
    marca: string;
    modelo: string;
    cor: string;
    ano: number;
}

export interface VeiculoUpdateDto {
    placa: string;
    marca: string;
    modelo: string;
    cor: string;
    ano: number;
}

export interface VeiculoListParams {
    search?: string;
    page?: number;
    pageSize?: number;
}
