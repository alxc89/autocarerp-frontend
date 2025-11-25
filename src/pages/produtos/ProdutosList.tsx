// src/pages/produtos/ProdutosList.tsx
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Produto = {
    codigo: number
    nome: string
    descricao: string
    fornecedor: string
    valor: number
}

export default function ProdutosList() {
    const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        setProdutos([
            { codigo: 1, nome: "Troca de óleo", descricao: "Serviço", fornecedor: "Interno", valor: 120.0 },
        ])
    }, [])

    return (
        <div className="p-4 space-y-4">
            <div className="p-2 flex items-center justify-between">
                <h1 className="text-xl font-bold">Produtos / Serviços</h1>
                <Button asChild>
                    <a href="/produtos/novo">Novo produto/serviço</a>
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
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Fornecedor</TableHead>
                                    <TableHead>Valor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {produtos.map((p) => (
                                    <TableRow key={p.codigo}>
                                        <TableCell>{p.codigo}</TableCell>
                                        <TableCell>{p.nome}</TableCell>
                                        <TableCell>{p.descricao}</TableCell>
                                        <TableCell>{p.fornecedor}</TableCell>
                                        <TableCell>R$ {p.valor.toFixed(2)}</TableCell>
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
