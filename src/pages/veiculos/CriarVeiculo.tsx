// src/pages/Veiculos/CriarVeiculo.jsx

import { useState } from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function CriarVeiculo() {
    const [veiculo, setVeiculo] = useState({ placa: "", marca: "", modelo: "", cor: "", ano: "" });
    const handleChange = e => setVeiculo({ ...veiculo, [e.target.name]: e.target.value });

    return (
        <div className="flex flex-1 flex-col items-center gap-4 p-4 pt-0">
            <div className="text-3xl font-bold mt-8">
                <label>Cadastrar Veículo</label>
            </div>
            <div className="p-2 flex items-center justify-between">
                <Card>
                    <CardContent>

                        <form className="space-y-3">
                            <Input name="placa" placeholder="Placa" value={veiculo.placa} onChange={handleChange} required />
                            <Input name="marca" placeholder="Marca" value={veiculo.marca} onChange={handleChange} required />
                            <Input name="modelo" placeholder="Modelo" value={veiculo.modelo} onChange={handleChange} required />
                            <Input name="cor" placeholder="Cor" value={veiculo.cor} onChange={handleChange} />
                            <Input name="ano" placeholder="Ano" type="number" value={veiculo.ano} onChange={handleChange} required />
                            <Button type="submit">Salvar</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
