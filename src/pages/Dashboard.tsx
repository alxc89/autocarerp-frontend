// src/pages/Dashboard.jsx


import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Dashboard() {
    return (
        <div className="p-4 grid gap-6 md:grid-cols-3 grid-cols-1">
            {/* Card de Resumo de Clientes */}
            <Card>
                <CardContent>
                    <h3 className="text-lg font-semibold mb-2">Clientes Cadastrados</h3>
                    <p className="text-3xl mb-4">{/* Exiba o total vindo da API */}120</p>
                    <Button href="/clientes">Ver clientes</Button>
                </CardContent>
            </Card>

            {/* Card de Ordens de Serviço em aberto */}
            <Card>
                <CardContent>
                    <h3 className="text-lg font-semibold mb-2">OS em Aberto</h3>
                    <p className="text-3xl mb-4">8</p>
                    <Button href="/ordem-servico">Ver OS</Button>
                </CardContent>
            </Card>

            {/* Card de Produtos/Serviços */}
            <Card>
                <CardContent>
                    <h3 className="text-lg font-semibold mb-2">Produtos/Serviços</h3>
                    <p className="text-3xl mb-4">34</p>
                    <Button href="/produtos">Ver produtos</Button>
                </CardContent>
            </Card>
        </div>
    );
}
