import { useState } from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

export default function CriarOrdemServico() {
    const [ordem, setOrdem] = useState({
        veiculo: "",
        cliente: "",
        produtoServico: "",
        quantidade: 1,
        valorUnitario: "",
        observacao: "",
        status: "",
    });

    const handleChange = e => setOrdem({ ...ordem, [e.target.name]: e.target.value });

    return (
        <div className="flex flex-1 flex-col items-center gap-4 p-4 pt-0">
            <div className="text-3xl font-bold mt-8">
                <label>Abrir Ordem de Serviço</label>
            </div>
            <div className="p-2 flex items-center justify-between">
                <Card>
                    <CardContent>
                        <form className="space-y-3">
                            <Input name="veiculo" placeholder="Veículo" value={ordem.veiculo} onChange={handleChange} required />
                            <Input name="cliente" placeholder="Cliente" value={ordem.cliente} onChange={handleChange} required />
                            <Input name="produtoServico" placeholder="Produto/Serviço" value={ordem.produtoServico} onChange={handleChange} required />
                            <Input name="quantidade" type="number" placeholder="Quantidade" min={1} value={ordem.quantidade} onChange={handleChange} required />
                            <Input name="valorUnitario" placeholder="Valor Unitário" type="number" value={ordem.valorUnitario} onChange={handleChange} required />
                            <Textarea name="observacao" placeholder="Observações" value={ordem.observacao} onChange={handleChange} />
                            <Input name="status" placeholder="Status" value={ordem.status} onChange={handleChange} required />
                            <Button type="submit">Salvar</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}