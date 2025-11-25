// src/pages/os/OsList.tsx
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type OrdemServico = {
    codigo: number
    cliente: string
    veiculo: string
    horaAbertura: string
    horaFechamento?: string
    status: string
    valorTotal: number
}

export default function OsList() {
    const [ordens, setOrdens] = useState<OrdemServico[]>([])

    useEffect(() => {
        setOrdens([
            {
                codigo: 1,
                cliente: "João",
                veiculo: "ABC-1234",
                horaAbertura: "2025-11-23 10:00",
                status: "Aberta",
                valorTotal: 350.0,
            },
        ])
    }, [])

    return (
        <div className="p-4 space-y-4">
            <div className="p-2 flex items-center justify-between">
                <h1 className="text-xl font-bold">Ordens de Serviço</h1>
                <Button asChild>
                    <a href="/ordem-servico/nova">Nova O.S.</a>
                </Button>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl " >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Veículo</TableHead>
                                    <TableHead>Abertura</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Valor Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ordens.map((o) => (
                                    <TableRow key={o.codigo}>
                                        <TableCell>{o.codigo}</TableCell>
                                        <TableCell>{o.cliente}</TableCell>
                                        <TableCell>{o.veiculo}</TableCell>
                                        <TableCell>{o.horaAbertura}</TableCell>
                                        <TableCell>{o.status}</TableCell>
                                        <TableCell>R$ {o.valorTotal.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
