import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import clienteService from "@/services/cliente.service";
import type { ClienteUpdateDto } from "@/types/cliente.types";
import { parseValidationErrors, getFieldError, type ValidationErrors } from "@/lib/validation-errors";

export default function EditarCliente() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const [formData, setFormData] = useState<ClienteUpdateDto>({
        nome: "",
        telefone: "",
        cpfCnpj: "",
        endereco: "",
        email: ""
    });

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);

    // Load cliente data on mount
    useEffect(() => {
        const loadCliente = async () => {
            if (!id) {
                setError("ID do cliente não fornecido");
                setLoadingData(false);
                return;
            }

            try {
                setLoadingData(true);
                const cliente = await clienteService.getById(parseInt(id));
                
                setFormData({
                    nome: cliente.nome,
                    telefone: cliente.telefone || "",
                    cpfCnpj: cliente.cpfCnpj || "",
                    endereco: cliente.endereco || "",
                    email: cliente.email || ""
                });
            } catch (err: any) {
                console.error('Error loading cliente:', err);
                setError('Erro ao carregar dados do cliente');
            } finally {
                setLoadingData(false);
            }
        };

        loadCliente();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear errors when user starts typing
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

            await clienteService.update(parseInt(id), formData);
            
            // Navigate to list page on success
            navigate("/clientes");
        } catch (err: any) {
            console.error('Error updating cliente:', err);
            
            // Try to parse validation errors
            const validationErrs = parseValidationErrors(err);
            
            if (validationErrs) {
                setValidationErrors(validationErrs);
                setError('Por favor, corrija os erros abaixo.');
            } else {
                setError(err.response?.data?.message || 'Erro ao atualizar cliente. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="flex flex-1 items-center justify-center p-4">
                <p>Carregando dados do cliente...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Editar Cliente</h1>
                <Button 
                    variant="outline" 
                    onClick={() => navigate("/clientes")}
                >
                    Voltar
                </Button>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Dados do Cliente</CardTitle>
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
                                placeholder="Nome completo"
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
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                                id="telefone"
                                name="telefone"
                                placeholder="(00) 00000-0000"
                                value={formData.telefone || ""}
                                onChange={handleChange}
                                maxLength={15}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'telefone') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'telefone') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'telefone')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                            <Input
                                id="cpfCnpj"
                                name="cpfCnpj"
                                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                                value={formData.cpfCnpj || ""}
                                onChange={handleChange}
                                maxLength={15}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'cpfCnpj') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'cpfCnpj') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'cpfCnpj')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endereco">Endereço</Label>
                            <Input
                                id="endereco"
                                name="endereco"
                                placeholder="Rua, número, bairro, cidade"
                                value={formData.endereco || ""}
                                onChange={handleChange}
                                maxLength={50}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'endereco') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'endereco') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'endereco')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@exemplo.com"
                                value={formData.email || ""}
                                onChange={handleChange}
                                maxLength={50}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'email') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'email') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'email')}</p>
                            )}
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
                                onClick={() => navigate("/clientes")}
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
