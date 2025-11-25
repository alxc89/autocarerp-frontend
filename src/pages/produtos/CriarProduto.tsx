import { useState } from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";

export default function CriarProduto() {
    const [produto, setProduto] = useState({ nome: "", descricao: "", fornecedor: "", custo: "", valor: "" });
    const handleChange = e => setProduto({ ...produto, [e.target.name]: e.target.value });

    return (
        <div className="flex flex-1 flex-col items-center gap-4 p-4 pt-0">
            <div className="text-3xl font-bold mt-8">
                <label>Cadastrar Produto/Serviço</label>
            </div>
            <div className="p-2 flex items-center justify-between">
                <Card>
                    <CardContent>
                        <form className="space-y-3">
                            <Input name="nome" placeholder="Nome" value={produto.nome} onChange={handleChange} required />
                            <Input name="descricao" placeholder="Descrição" value={produto.descricao} onChange={handleChange} />
                            <Input name="fornecedor" placeholder="Fornecedor" value={produto.fornecedor} onChange={handleChange} />
                            <Input name="custo" placeholder="Custo" type="number" value={produto.custo} onChange={handleChange} />
                            <Input name="valor" placeholder="Valor" type="number" value={produto.valor} onChange={handleChange} required />
                            <Button type="submit">Salvar</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}