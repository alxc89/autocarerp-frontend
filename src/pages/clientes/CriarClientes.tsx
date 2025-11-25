// src/pages/Clientes/CriarCliente.jsx

import { useState } from "react";
import {Input} from "@/components/ui/input.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function CriarCliente() {
    const [cliente, setCliente] = useState({ nome: "", telefone: "", cpfCnpj: "", endereco: "", email: "" });
    const handleChange = e => setCliente({ ...cliente, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        // Substitua pelo endpoint correto
        // fetch('/api/clientes', { method: 'POST', body: JSON.stringify(cliente) });
    };

    return (
        <div className="flex flex-1 flex-col items-center gap-4 p-4 pt-0">
            <div className="text-3xl font-bold mt-8">
                <label>Cadastrar Cliente</label>
            </div>
            <div className="p-2 flex items-center justify-between">
                <Card>
                    <CardContent>
                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <Input name="nome" placeholder="Nome" value={cliente.nome} onChange={handleChange} required />
                            <Input name="telefone" placeholder="Telefone" value={cliente.telefone} onChange={handleChange} required />
                            <Input name="cpfCnpj" placeholder="CPF/CNPJ" value={cliente.cpfCnpj} onChange={handleChange} required />
                            <Input name="endereco" placeholder="Endereço" value={cliente.endereco} onChange={handleChange} />
                            <Input name="email" placeholder="Email" type="email" value={cliente.email} onChange={handleChange} />
                            <Button type="submit">Salvar</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}
