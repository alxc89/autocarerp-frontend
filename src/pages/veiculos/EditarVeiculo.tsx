import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import veiculoService from "@/services/veiculo.service";
import type { VeiculoUpdateDto } from "@/types/veiculo.types";
import { parseValidationErrors, getFieldError, type ValidationErrors } from "@/lib/validation-errors";

export default function EditarVeiculo() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const [formData, setFormData] = useState<VeiculoUpdateDto>({
        placa: "",
        marca: "",
        modelo: "",
        cor: "",
        ano: new Date().getFullYear()
    });

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);

    // Load veiculo data on mount
    useEffect(() => {
        const loadVeiculo = async () => {
            if (!id) {
                setError("ID do veículo não fornecido");
                setLoadingData(false);
                return;
            }

            try {
                setLoadingData(true);
                const veiculo = await veiculoService.getById(parseInt(id));
                
                setFormData({
                    placa: veiculo.placa,
                    marca: veiculo.marca,
                    modelo: veiculo.modelo,
                    cor: veiculo.cor,
                    ano: veiculo.ano
                });
            } catch (err: any) {
                console.error('Error loading veiculo:', err);
                setError('Erro ao carregar dados do veículo');
            } finally {
                setLoadingData(false);
            }
        };

        loadVeiculo();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: name === 'ano' ? parseInt(value) || 0 : value 
        });
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

            await veiculoService.update(parseInt(id), formData);
            
            navigate("/veiculos");
        } catch (err: any) {
            console.error('Error updating veiculo:', err);
            
            const validationErrs = parseValidationErrors(err);
            
            if (validationErrs) {
                setValidationErrors(validationErrs);
                setError('Por favor, corrija os erros abaixo.');
            } else {
                setError(err.response?.data?.message || 'Erro ao atualizar veículo. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="flex flex-1 items-center justify-center p-4">
                <p>Carregando dados do veículo...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Editar Veículo</h1>
                <Button 
                    variant="outline" 
                    onClick={() => navigate("/veiculos")}
                >
                    Voltar
                </Button>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Dados do Veículo</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="placa">Placa *</Label>
                            <Input
                                id="placa"
                                name="placa"
                                placeholder="ABC-1234"
                                value={formData.placa}
                                onChange={handleChange}
                                required
                                maxLength={10}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'placa') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'placa') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'placa')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="marca">Marca *</Label>
                            <Input
                                id="marca"
                                name="marca"
                                placeholder="Ex: Volkswagen, Fiat, Chevrolet"
                                value={formData.marca}
                                onChange={handleChange}
                                required
                                maxLength={15}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'marca') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'marca') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'marca')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modelo">Modelo *</Label>
                            <Input
                                id="modelo"
                                name="modelo"
                                placeholder="Ex: Gol, Uno, Onix"
                                value={formData.modelo}
                                onChange={handleChange}
                                required
                                maxLength={15}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'modelo') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'modelo') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'modelo')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cor">Cor *</Label>
                            <Input
                                id="cor"
                                name="cor"
                                placeholder="Ex: Branco, Preto, Prata"
                                value={formData.cor}
                                onChange={handleChange}
                                required
                                maxLength={15}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'cor') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'cor') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'cor')}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ano">Ano *</Label>
                            <Input
                                id="ano"
                                name="ano"
                                type="number"
                                placeholder="2024"
                                value={formData.ano}
                                onChange={handleChange}
                                required
                                min={1900}
                                max={new Date().getFullYear() + 1}
                                disabled={loading}
                                className={getFieldError(validationErrors, 'ano') ? 'border-red-500' : ''}
                            />
                            {getFieldError(validationErrors, 'ano') && (
                                <p className="text-sm text-red-600">{getFieldError(validationErrors, 'ano')}</p>
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
                                onClick={() => navigate("/veiculos")}
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
