import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import produtoService from "@/services/produto.service";
import type { ProdutoServicoUpdateDto } from "@/types/produto.types";
import { parseValidationErrors, getFieldError, type ValidationErrors } from "@/lib/validation-errors";

export default function EditarProduto() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const [formData, setFormData] = useState<ProdutoServicoUpdateDto>({
        nome: "",
        descricao: "",
        fornecedor: "",
        custo: undefined,
        valor: 0
    });

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);

    useEffect(() => {
        const loadProduto = async () => {
            if (!id) {
                setError("ID do produto não fornecido");
                setLoadingData(false);
                return;
            }

            try {
                setLoadingData(true);
                const produto = await produtoService.getById(parseInt(id));
                
                setFormData({
                    nome: produto.nome,
                    descricao: produto.descricao,
                    fornecedor: produto.fornecedor || "",
                    custo: produto.custo,
                    valor: produto.valor
                });
            } catch (err: any) {
                console.error('Error loading produto:', err);
                setError('Erro ao carregar dados do produto/serviço');
            } finally {
                setLoadingData(false);
            }
        };

        loadProduto();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'custo' || name === 'valor') {
            setFormData({ 
                ...formData, 
                [name]: value ? parseFloat(value) : (name === 'custo' ? undefined : 0)
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        
        if (error) setError(null);
        if (validationErrors) setValidationErrors(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            setValidationErrors(null);

            await produtoService.update(parseInt(id), formData);
            
            navigate("/produtos");
        } catch (err: any) {
            console.error('Error updating produto:', err);
            
            const validationErrs = parseValidationErrors(err);
            
            if (validationErrs) {
                setValidationErrors(validationErrs);
                setError('Por favor, corrija os erros abaixo.');
            } else {
                setError(err.response?.data?.message || 'Erro ao atualizar produto/serviço. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="flex flex-1 items-center justify-center p-4">
                <p>Carregando dados do produto/serviço...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Editar Produto/Serviço</h1>
                <Button 
                    variant="outline" 
                    onClick={() => navigate("/produtos")}
                >
                    Voltar
                </Button>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Dados do Produto/Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome *</Label>
                            <Input
                                id="nome"
                                name="nome"
                                placeholder="Nome do produto ou serviço"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                maxLength={30}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'nome') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'nome') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'nome')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="descricao">Descrição *</Label>
                            <Textarea
                                id="descricao"
                                name="descricao"
                                placeholder="Descrição detalhada"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                                maxLength={50}
                                disabled={loading}
                                rows={3}
                                className={getFieldError(validationErrors, 'descricao') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'descricao') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'descricao')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fornecedor">Fornecedor</Label>
                            <Input
                                id="fornecedor"
                                name="fornecedor"
                                placeholder="Nome do fornecedor"
                                value={formData.fornecedor || ""}
                                onChange={handleChange}
                                maxLength={30}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'fornecedor') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'fornecedor') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'fornecedor')}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="custo">Custo (opcional)</Label>
                                <Input
                                    id="custo"
                                    name="custo"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={formData.custo ?? ""}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={getFieldError(validationErrors, 'custo') ? 'border-red-500' : ''}
                                />
                                {getFieldError(validationErrors, 'custo') && (
                                    <p className="text-sm text-red-600">{getFieldError(validationErrors, 'custo')}</p>
                                )}
                                <p className="text-xs text-muted-foreground">Valor de custo</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="valor">Valor de Venda *</Label>
                                <Input
                                    id="valor"
                                    name="valor"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={formData.valor}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className={getFieldError(validationErrors, 'valor') ? 'border-red-500' : ''}
                                />
                                {getFieldError(validationErrors, 'valor') && (
                                    <p className="text-sm text-red-600">{getFieldError(validationErrors, 'valor')}</p>
                                )}
                                <p className="text-xs text-muted-foreground">Preço de venda</p>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button 
                                type="submit" 
                                disabled={loading}
                            >
                                {loading ? "Salvando..." : "Salvar Alterações"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/produtos")}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
