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
import { useRouter } from "next/navigation"
import { HeaderOptions } from "../_components/HeaderOptions"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { DetailsDialog } from "./_components/detailsDialogProducts"
import { getProdutos } from "@/src/services/ProductService"

export default function ProdutosPage() {
    const [open, setOpen] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState<Product | null>(null)
    const [novoOpen, setNovoOpen] = useState(false)
    const [produtos, setProdutos] = useState<Product[]>([])

    const router = useRouter()

    const toOptions = () => {
        router.push("/pageOptions")
    }

    const handleRowClick = (produto: Product) => {
        setProdutoSelecionado(produto)
        setOpen(true)
    }

    const fetchProdutos = async () => {
        try {
            const data = await getProdutos()
            setProdutos(data)
        } catch (error: any) {
            toast.error(error.message || "Erro ao carregar lista de produtos")
            console.error(error)
            router.push("/")
        }
    }


    useEffect(() => {
        fetchProdutos()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <HeaderOptions onOptionsClick={toOptions} />

            <div className="max-w-[70%] mx-auto mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Lista de Produtos</h1>
                <Button className="bg-green-600" onClick={() => setNovoOpen(true)}>
                    Adicionar Produto
                </Button>
            </div>

            <div className="border rounded-lg shadow-md overflow-auto max-w-[90%] mx-auto bg-white">
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
                                key={produto.code}
                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => handleRowClick(produto)}
                            >
                                <TableCell>{produto.code}</TableCell>
                                <TableCell>{produto.description}</TableCell>
                                <TableCell>{produto.barCode}</TableCell>
                                <TableCell>{produto.price}</TableCell>
                                <TableCell>{produto.grossWeight}</TableCell>
                                <TableCell>{produto.netWeight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DetailsDialog
                open={open}
                onOpenChange={setOpen}
                produtoSelecionado={produtoSelecionado}
                onProdutoAdicionado={fetchProdutos}
                onProdutoDeletado={fetchProdutos}
            />

            <DetailsDialog
                open={novoOpen}
                onOpenChange={setNovoOpen}
                produtoSelecionado={null}
                isNew
                onProdutoAdicionado={fetchProdutos}
            />
        </div>
    )
}
