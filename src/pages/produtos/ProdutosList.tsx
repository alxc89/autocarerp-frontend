import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Search } from "lucide-react";
import produtoService from "@/services/produto.service";
import type { ProdutoServicoReadDto } from "@/types/produto.types";

export default function ProdutosList() {
    const navigate = useNavigate();
    
    const [produtos, setProdutos] = useState<ProdutoServicoReadDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;

    const fetchProdutos = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await produtoService.getAll({
                search: searchTerm,
                page,
                pageSize
            });

            setProdutos(result.items);
            setTotalPages(Math.ceil(result.totalCount / pageSize));
        } catch (err: any) {
            console.error('Error loading produtos:', err);
            setError(err.response?.data?.message || 'Erro ao carregar produtos/serviços');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, [page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchProdutos();
    };

    const handleDelete = async (codigo: number, nome: string) => {
        if (!window.confirm(`Deseja realmente excluir "${nome}"?`)) {
            return;
        }

        try {
            await produtoService.delete(codigo);
            fetchProdutos();
        } catch (err: any) {
            console.error('Error deleting produto:', err);
            alert(err.response?.data?.message || 'Erro ao excluir produto/serviço');
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Produtos / Serviços</h1>
                <Button onClick={() => navigate("/produtos/novo")}>
                    Novo Produto/Serviço
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Produtos e Serviços</CardTitle>
                    <form onSubmit={handleSearch} className="flex gap-2 mt-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nome, descrição, fornecedor..."
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
                            <p>Carregando produtos/serviços...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {!loading && !error && produtos.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Nenhum produto/serviço encontrado.</p>
                            <Button 
                                variant="link" 
                                onClick={() => navigate("/produtos/novo")}
                                className="mt-2"
                            >
                                Cadastrar primeiro produto/serviço
                            </Button>
                        </div>
                    )}

                    {!loading && !error && produtos.length > 0 && (
                        <>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">Código</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Descrição</TableHead>
                                            <TableHead>Fornecedor</TableHead>
                                            <TableHead className="text-right">Custo</TableHead>
                                            <TableHead className="text-right">Valor</TableHead>
                                            <TableHead className="w-[120px] text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {produtos.map((produto) => (
                                            <TableRow key={produto.codigo}>
                                                <TableCell className="font-medium">{produto.codigo}</TableCell>
                                                <TableCell>{produto.nome}</TableCell>
                                                <TableCell className="max-w-xs truncate">{produto.descricao}</TableCell>
                                                <TableCell>{produto.fornecedor || "-"}</TableCell>
                                                <TableCell className="text-right">
                                                    {produto.custo ? `R$ ${produto.custo.toFixed(2)}` : "-"}
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    R$ {produto.valor.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => navigate(`/produtos/editar/${produto.codigo}`)}
                                                            title="Editar"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDelete(produto.codigo, produto.nome)}
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
