'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { HeaderOptions } from "../_components/HeaderOptions"
import { useRouter } from "next/navigation"
import { DetailsDialog } from "./_components/detailsDialogProducts"

interface Produto {
    codigo: string
    descricao: string
    codigoBarras: string
    valorVenda: string
    pesoBruto: string
    pesoLiquido: string
}

const produtos: Produto[] = [
    {
        codigo: "P001",
        descricao: "Shampoo Capilar",
        codigoBarras: "7891234567890",
        valorVenda: "R$ 25,90",
        pesoBruto: "0.550 kg",
        pesoLiquido: "0.500 kg"
    },
    {
        codigo: "P002",
        descricao: "Condicionador Premium",
        codigoBarras: "7899876543210",
        valorVenda: "R$ 29,90",
        pesoBruto: "0.570 kg",
        pesoLiquido: "0.520 kg"
    }
]

export default function ProdutosPage() {
    const [open, setOpen] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
    const [novoOpen, setNovoOpen] = useState(false)

    const router = useRouter()
    const toOptions = () => router.push("/pageOptions")

    const handleRowClick = (produto: Produto) => {
        setProdutoSelecionado(produto)
        setOpen(true)
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <HeaderOptions onOptionsClick={toOptions} />

            <div className="max-w-[70%] mx-auto mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">Lista de Produtos</h1>
                <Button className="bg-green-600"
                    onClick={() => setNovoOpen(true)}>Adicionar Produto</Button>
            </div>

            <div className="border rounded-lg shadow-md overflow-auto max-w-[70%] mx-auto bg-white">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="w-24">Código</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Cód. Barras</TableHead>
                            <TableHead>Valor de Venda</TableHead>
                            <TableHead>Peso Bruto</TableHead>
                            <TableHead>Peso Líquido</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {produtos.map((produto) => (
                            <TableRow
                                key={produto.codigo}
                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => handleRowClick(produto)}
                            >
                                <TableCell>{produto.codigo}</TableCell>
                                <TableCell>{produto.descricao}</TableCell>
                                <TableCell>{produto.codigoBarras}</TableCell>
                                <TableCell>{produto.valorVenda}</TableCell>
                                <TableCell>{produto.pesoBruto}</TableCell>
                                <TableCell>{produto.pesoLiquido}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DetailsDialog
                open={open}
                onOpenChange={setOpen}
                produtoSelecionado={produtoSelecionado}
            />

            <DetailsDialog
                open={novoOpen}
                onOpenChange={setNovoOpen}
                produtoSelecionado={null}
                isNew
            />
        </div>
    )
}
