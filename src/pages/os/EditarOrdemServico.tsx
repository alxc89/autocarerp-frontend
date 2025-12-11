import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ordemServicoService from "@/services/ordem-servico.service";
import clienteService from "@/services/cliente.service";
import veiculoService from "@/services/veiculo.service";
import produtoService from "@/services/produto.service";
import type { OrdemDeServicoUpdateDto } from "@/types/ordem-servico.types";
import type { ClienteReadDto } from "@/types/cliente.types";
import type { VeiculoReadDto } from "@/types/veiculo.types";
import type { ProdutoServicoReadDto } from "@/types/produto.types";
import { parseValidationErrors, type ValidationErrors } from "@/lib/validation-errors";

export default function EditarOrdemServico() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const [formData, setFormData] = useState<OrdemDeServicoUpdateDto>({
        horaAbertura: "",
        horaFechamento: undefined,
        veiculoId: 0,
        clienteId: 0,
        produtoServicoId: 0,
        quantidade: 1,
        valorUnitario: 0,
        valorTotal: 0,
        observacao: "",
        status: "ABERTA"
    });

    const [clientes, setClientes] = useState<ClienteReadDto[]>([]);
    const [veiculos, setVeiculos] = useState<VeiculoReadDto[]>([]);
    const [produtos, setProdutos] = useState<ProdutoServicoReadDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!id) {
                setError("ID da ordem de serviço não fornecido");
                setLoadingData(false);
                return;
            }

            try {
                setLoadingData(true);
                const [os, clientesResult, veiculosResult, produtosResult] = await Promise.all([
                    ordemServicoService.getById(parseInt(id)),
                    clienteService.getAll({ page: 1, pageSize: 100 }),
                    veiculoService.getAll({ page: 1, pageSize: 100 }),
                    produtoService.getAll({ page: 1, pageSize: 100 })
                ]);
                
                setClientes(clientesResult.items);
                setVeiculos(veiculosResult.items);
                setProdutos(produtosResult.items);
                
                setFormData({
                    horaAbertura: new Date(os.horaAbertura).toISOString().slice(0, 16),
                    horaFechamento: os.horaFechamento ? new Date(os.horaFechamento).toISOString().slice(0, 16) : undefined,
                    veiculoId: os.veiculoId,
                    clienteId: os.clienteId,
                    produtoServicoId: os.produtoServicoId,
                    quantidade: os.quantidade,
                    valorUnitario: os.valorUnitario,
                    valorTotal: os.valorTotal,
                    observacao: os.observacao || "",
                    status: os.status
                });
            } catch (err: any) {
                console.error('Error loading ordem de servico:', err);
                setError('Erro ao carregar dados da ordem de serviço');
            } finally {
                setLoadingData(false);
            }
        };

        loadData();
    }, [id]);

    useEffect(() => {
        const total = formData.quantidade * formData.valorUnitario;
        if (formData.valorTotal !== total) {
            setFormData(prev => ({ ...prev, valorTotal: total }));
        }
    }, [formData.quantidade, formData.valorUnitario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'quantidade' || name === 'valorUnitario') {
            setFormData({ ...formData, [name]: parseFloat(value) || 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        
        if (error) setError(null);
        if (validationErrors) setValidationErrors(null);
    };

    const handleSelectChange = (name: string, value: string) => {
        if (name === 'produtoServicoId') {
            const produto = produtos.find(p => p.codigo === parseInt(value));
            setFormData({ 
                ...formData, 
                [name]: parseInt(value),
                valorUnitario: produto?.valor || formData.valorUnitario
            });
        } else {
            setFormData({ ...formData, [name]: name === 'status' ? value : parseInt(value) });
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

            await ordemServicoService.update(parseInt(id), {
                ...formData,
                horaAbertura: new Date(formData.horaAbertura).toISOString(),
                horaFechamento: formData.horaFechamento ? new Date(formData.horaFechamento).toISOString() : undefined
            });
            
            navigate("/ordem-servico");
        } catch (err: any) {
            console.error('Error updating ordem de servico:', err);
            
            const validationErrs = parseValidationErrors(err);
            
            if (validationErrs) {
                setValidationErrors(validationErrs);
                setError('Por favor, corrija os erros abaixo.');
            } else {
                setError(err.response?.data?.message || 'Erro ao atualizar ordem de serviço. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="flex flex-1 items-center justify-center p-4">
                <p>Carregando dados da ordem de serviço...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Editar Ordem de Serviço</h1>
                <Button 
                    variant="outline" 
                    onClick={() => navigate("/ordem-servico")}
                >
                    Voltar
                </Button>
            </div>

            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Dados da Ordem de Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="clienteId">Cliente *</Label>
                                <Select 
                                    value={formData.clienteId.toString()}
                                    onValueChange={(value) => handleSelectChange('clienteId', value)}
                                    disabled={loading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clientes.map((cliente) => (
                                            <SelectItem key={cliente.codigo} value={cliente.codigo.toString()}>
                                                {cliente.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="veiculoId">Veículo *</Label>
                                <Select 
                                    value={formData.veiculoId.toString()}
                                    onValueChange={(value) => handleSelectChange('veiculoId', value)}
                                    disabled={loading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um veículo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {veiculos.map((veiculo) => (
                                            <SelectItem key={veiculo.codigo} value={veiculo.codigo.toString()}>
                                                {veiculo.placa} - {veiculo.marca} {veiculo.modelo}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="produtoServicoId">Produto/Serviço *</Label>
                            <Select 
                                value={formData.produtoServicoId.toString()}
                                onValueChange={(value) => handleSelectChange('produtoServicoId', value)}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um produto/serviço" />
                                </SelectTrigger>
                                <SelectContent>
                                    {produtos.map((produto) => (
                                        <SelectItem key={produto.codigo} value={produto.codigo.toString()}>
                                            {produto.nome} - R$ {produto.valor.toFixed(2)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quantidade">Quantidade *</Label>
                                <Input
                                    id="quantidade"
                                    name="quantidade"
                                    type="number"
                                    min="1"
                                    value={formData.quantidade}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="valorUnitario">Valor Unitário *</Label>
                                <Input
                                    id="valorUnitario"
                                    name="valorUnitario"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.valorUnitario}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="valorTotal">Valor Total</Label>
                                <Input
                                    id="valorTotal"
                                    name="valorTotal"
                                    type="number"
                                    step="0.01"
                                    value={formData.valorTotal}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="horaAbertura">Data/Hora de Abertura *</Label>
                            <Input
                                id="horaAbertura"
                                name="horaAbertura"
                                type="datetime-local"
                                value={formData.horaAbertura}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="horaFechamento">Data/Hora de Fechamento</Label>
                            <Input
                                id="horaFechamento"
                                name="horaFechamento"
                                type="datetime-local"
                                value={formData.horaFechamento || ""}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <p className="text-xs text-muted-foreground">Deixe em branco se ainda não foi finalizada</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status *</Label>
                            <Select 
                                value={formData.status}
                                onValueChange={(value) => handleSelectChange('status', value)}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ABERTA">Aberta</SelectItem>
                                    <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                                    <SelectItem value="FINALIZADA">Finalizada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="observacao">Observações</Label>
                            <Textarea
                                id="observacao"
                                name="observacao"
                                placeholder="Observações sobre a ordem de serviço"
                                value={formData.observacao || ""}
                                onChange={handleChange}
                                maxLength={50}
                                disabled={loading}
                                rows={3}
                            />
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
                                onClick={() => navigate("/ordem-servico")}
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
