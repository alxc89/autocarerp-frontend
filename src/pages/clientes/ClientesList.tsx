// src/pages/clientes/ClientesList.tsx
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Cliente = {
    codigo: number
    nome: string
    telefone: string
    cpfCnpj: string
    email: string
}

export default function ClientesList() {
    const [clientes, setClientes] = useState<Cliente[]>([])

    useEffect(() => {
        // Chamar API C# depois
        // fetch("http://localhost:5000/api/clientes").then(...)
        setClientes([
            { codigo: 1, nome: "João", telefone: "11 99999-9999", cpfCnpj: "123.456.789-00", email: "joao@test.com" },
        ])
    }, [])

    return (
        <div className="p-4 space-y-4">
            <div className="p-2 flex items-center justify-between">
                <h1 className="text-xl font-bold">Clientes</h1>
                <Button asChild>
                    <a href="/clientes/novo">Novo cliente</a>
                </Button>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl " >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Telefone</TableHead>
                                    <TableHead>CPF/CNPJ</TableHead>
                                    <TableHead>Email</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clientes.map((c) => (
                                    <TableRow key={c.codigo}>
                                        <TableCell>{c.codigo}</TableCell>
                                        <TableCell>{c.nome}</TableCell>
                                        <TableCell>{c.telefone}</TableCell>
                                        <TableCell>{c.cpfCnpj}</TableCell>
                                        <TableCell>{c.email}</TableCell>
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
