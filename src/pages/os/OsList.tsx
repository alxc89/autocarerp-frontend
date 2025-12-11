import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Search } from "lucide-react";
import ordemServicoService from "@/services/ordem-servico.service";
import type { OrdemDeServicoReadDto } from "@/types/ordem-servico.types";

export default function OsList() {
    const navigate = useNavigate();
    
    const [ordens, setOrdens] = useState<OrdemDeServicoReadDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;

    const fetchOrdens = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await ordemServicoService.getAll({
                search: searchTerm,
                page,
                pageSize
            });

            setOrdens(result.items);
            setTotalPages(Math.ceil(result.totalCount / pageSize));
        } catch (err: any) {
            console.error('Error loading ordens:', err);
            setError(err.response?.data?.message || 'Erro ao carregar ordens de serviço');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdens();
    }, [page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchOrdens();
    };

    const handleDelete = async (codigo: number) => {
        if (!window.confirm(`Deseja realmente excluir a O.S. #${codigo}?`)) {
            return;
        }

        try {
            await ordemServicoService.delete(codigo);
            fetchOrdens();
        } catch (err: any) {
            console.error('Error deleting ordem:', err);
            alert(err.response?.data?.message || 'Erro ao excluir ordem de serviço');
        }
    };

    const getStatusBadge = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('aberta')) {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{status}</span>;
        }
        if (statusLower.includes('andamento')) {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{status}</span>;
        }
        if (statusLower.includes('finalizada')) {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{status}</span>;
        }
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
                <Button onClick={() => navigate("/ordem-servico/nova")}>
                    Nova O.S.
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Ordens de Serviço</CardTitle>
                    <form onSubmit={handleSearch} className="flex gap-2 mt-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por código, status..."
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
                            <p>Carregando ordens de serviço...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {!loading && !error && ordens.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Nenhuma ordem de serviço encontrada.</p>
                            <Button 
                                variant="link" 
                                onClick={() => navigate("/ordem-servico/nova")}
                                className="mt-2"
                            >
                                Criar primeira ordem de serviço
                            </Button>
                        </div>
                    )}

                    {!loading && !error && ordens.length > 0 && (
                        <>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">Código</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Veículo</TableHead>
                                            <TableHead>Produto/Serviço</TableHead>
                                            <TableHead>Abertura</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Valor Total</TableHead>
                                            <TableHead className="w-[120px] text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {ordens.map((ordem) => (
                                            <TableRow key={ordem.codigo}>
                                                <TableCell className="font-medium">#{ordem.codigo}</TableCell>
                                                <TableCell>{ordem.clienteNome}</TableCell>
                                                <TableCell>{ordem.veiculoPlaca} - {ordem.veiculoModelo}</TableCell>
                                                <TableCell>{ordem.produtoServicoNome}</TableCell>
                                                <TableCell>
                                                    {new Date(ordem.horaAbertura).toLocaleString('pt-BR')}
                                                </TableCell>
                                                <TableCell>{getStatusBadge(ordem.status)}</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    R$ {ordem.valorTotal.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => navigate(`/ordem-servico/editar/${ordem.codigo}`)}
                                                            title="Editar"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDelete(ordem.codigo)}
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
