import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Search } from "lucide-react";
import veiculoService from "@/services/veiculo.service";
import type { VeiculoReadDto } from "@/types/veiculo.types";

export default function VeiculosList() {
    const navigate = useNavigate();
    
    const [veiculos, setVeiculos] = useState<VeiculoReadDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;

    const fetchVeiculos = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await veiculoService.getAll({
                search: searchTerm,
                page,
                pageSize
            });

            setVeiculos(result.items);
            setTotalPages(Math.ceil(result.totalCount / pageSize));
        } catch (err: any) {
            console.error('Error loading veiculos:', err);
            setError(err.response?.data?.message || 'Erro ao carregar veículos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVeiculos();
    }, [page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchVeiculos();
    };

    const handleDelete = async (codigo: number, placa: string) => {
        if (!window.confirm(`Deseja realmente excluir o veículo "${placa}"?`)) {
            return;
        }

        try {
            await veiculoService.delete(codigo);
            fetchVeiculos();
        } catch (err: any) {
            console.error('Error deleting veiculo:', err);
            alert(err.response?.data?.message || 'Erro ao excluir veículo');
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Veículos</h1>
                <Button onClick={() => navigate("/veiculos/novo")}>
                    Novo Veículo
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Veículos</CardTitle>
                    <form onSubmit={handleSearch} className="flex gap-2 mt-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por placa, marca, modelo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            Buscar
                        </Button>
                    </form>
                </CardHeader>
                <CardContent>
                    {loading && (
                        <div className="text-center py-8">
                            <p>Carregando veículos...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {!loading && !error && veiculos.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Nenhum veículo encontrado.</p>
                            <Button 
                                variant="link" 
                                onClick={() => navigate("/veiculos/novo")}
                                className="mt-2"
                            >
                                Cadastrar primeiro veículo
                            </Button>
                        </div>
                    )}

                    {!loading && !error && veiculos.length > 0 && (
                        <>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">Código</TableHead>
                                            <TableHead>Placa</TableHead>
                                            <TableHead>Marca</TableHead>
                                            <TableHead>Modelo</TableHead>
                                            <TableHead>Cor</TableHead>
                                            <TableHead>Ano</TableHead>
                                            <TableHead className="w-[120px] text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {veiculos.map((veiculo) => (
                                            <TableRow key={veiculo.codigo}>
                                                <TableCell className="font-medium">{veiculo.codigo}</TableCell>
                                                <TableCell className="font-mono">{veiculo.placa}</TableCell>
                                                <TableCell>{veiculo.marca}</TableCell>
                                                <TableCell>{veiculo.modelo}</TableCell>
                                                <TableCell>{veiculo.cor}</TableCell>
                                                <TableCell>{veiculo.ano}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => navigate(`/veiculos/editar/${veiculo.codigo}`)}
                                                            title="Editar"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDelete(veiculo.codigo, veiculo.placa)}
                                                            title="Excluir"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                    >
                                        Anterior
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Página {page} de {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                    >
                                        Próxima
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
