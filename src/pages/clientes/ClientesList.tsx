import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Search } from "lucide-react";
import clienteService from "@/services/cliente.service";
import type { ClienteReadDto } from "@/types/cliente.types";

export default function ClientesList() {
    const navigate = useNavigate();
    
    const [clientes, setClientes] = useState<ClienteReadDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;

    const fetchClientes = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await clienteService.getAll({
                search: searchTerm,
                page,
                pageSize
            });

            setClientes(result.items);
            setTotalPages(Math.ceil(result.totalCount / pageSize));
        } catch (err: any) {
            console.error('Error loading clientes:', err);
            setError(err.response?.data?.message || 'Erro ao carregar clientes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, [page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to first page on new search
        fetchClientes();
    };

    const handleDelete = async (codigo: number, nome: string) => {
        if (!window.confirm(`Deseja realmente excluir o cliente "${nome}"?`)) {
            return;
        }

        try {
            await clienteService.delete(codigo);
            // Refresh the list
            fetchClientes();
        } catch (err: any) {
            console.error('Error deleting cliente:', err);
            alert(err.response?.data?.message || 'Erro ao excluir cliente');
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Clientes</h1>
                <Button onClick={() => navigate("/clientes/novo")}>
                    Novo Cliente
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes</CardTitle>
                    <form onSubmit={handleSearch} className="flex gap-2 mt-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nome, telefone, CPF/CNPJ..."
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
                            <p>Carregando clientes...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {!loading && !error && clientes.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Nenhum cliente encontrado.</p>
                            <Button 
                                variant="link" 
                                onClick={() => navigate("/clientes/novo")}
                                className="mt-2"
                            >
                                Cadastrar primeiro cliente
                            </Button>
                        </div>
                    )}

                    {!loading && !error && clientes.length > 0 && (
                        <>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">Código</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Telefone</TableHead>
                                            <TableHead>CPF/CNPJ</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead className="w-[120px] text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clientes.map((cliente) => (
                                            <TableRow key={cliente.codigo}>
                                                <TableCell className="font-medium">{cliente.codigo}</TableCell>
                                                <TableCell>{cliente.nome}</TableCell>
                                                <TableCell>{cliente.telefone || "-"}</TableCell>
                                                <TableCell>{cliente.cpfCnpj || "-"}</TableCell>
                                                <TableCell>{cliente.email || "-"}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => navigate(`/clientes/editar/${cliente.codigo}`)}
                                                            title="Editar"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDelete(cliente.codigo, cliente.nome)}
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

                            {/* Pagination */}
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
