// src/pages/veiculos/VeiculosList.tsx
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Veiculo = {
    placa: string
    marca: string
    modelo: string
    cor: string
    ano: number
}

export default function VeiculosList() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([])

    useEffect(() => {
        setVeiculos([
            { placa: "ABC-1234", marca: "Fiat", modelo: "Uno", cor: "Branco", ano: 2015 },
        ])
    }, [])

    return (
        <div className="p-4 space-y-4">
            <div className="p-2 flex items-center justify-between">
                <h1 className="text-xl font-bold">Veículos</h1>
                <Button asChild>
                    <a href="/veiculos/novo">Novo veículo</a>
                </Button>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl " >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Placa</TableHead>
                                    <TableHead>Marca</TableHead>
                                    <TableHead>Modelo</TableHead>
                                    <TableHead>Cor</TableHead>
                                    <TableHead>Ano</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {veiculos.map((v) => (
                                    <TableRow key={v.placa}>
                                        <TableCell>{v.placa}</TableCell>
                                        <TableCell>{v.marca}</TableCell>
                                        <TableCell>{v.modelo}</TableCell>
                                        <TableCell>{v.cor}</TableCell>
                                        <TableCell>{v.ano}</TableCell>
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
