'use client'

import Image from "next/image"
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
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DetailsDialog } from "./_components/detailsDialog"

interface Cliente {
    codigo: string
    nome: string
    fantasia: string
    documento: string
    endereco: string
}

const clientes: Cliente[] = [
    {
        codigo: "001",
        nome: "Gabriel Fernandes",
        fantasia: "SoftLine",
        documento: "123.456.789-00",
        endereco: "Rua A, 123, Bairro Centro"
    },
    {
        codigo: "002",
        nome: "Ana Silva",
        fantasia: "Beleza & Cia",
        documento: "987.654.321-00",
        endereco: "Av. B, 456, Bairro Industrial"
    },
    // Adicione mais clientes aqui se desejar
]



export default function ClientesPage() {
    const [open, setOpen] = useState(false)
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
    const [novoOpen, setNovoOpen] = useState(false)

    const router = useRouter()
    const toOptions = () => {
        router.push("/pageOptions")
    }

    const handleRowClick = (cliente: Cliente) => {
        setClienteSelecionado(cliente)
        setOpen(true)
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">

            <HeaderOptions onOptionsClick={toOptions} />

            <div className="max-w-[70%] mx-auto mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Lista de Clientes</h1>
                <Button className="bg-green-600"
                    onClick={() => setNovoOpen(true)}>
                    Adicionar Cliente
                </Button>
            </div>


            <div className="border rounded-lg shadow-md overflow-auto max-w-[70%] mx-auto bg-white">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="w-24">Código</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Fantasia</TableHead>
                            <TableHead>Documento</TableHead>
                            <TableHead>Endereço</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clientes.map((cliente) => (
                            <TableRow
                                key={cliente.codigo}
                                className="hover:bg-gray-50 transition-colors"
                                onClick={() => handleRowClick(cliente)}
                            >
                                <TableCell>{cliente.codigo}</TableCell>
                                <TableCell>{cliente.nome}</TableCell>
                                <TableCell>{cliente.fantasia}</TableCell>
                                <TableCell>{cliente.documento}</TableCell>
                                <TableCell>{cliente.endereco}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DetailsDialog
                open={open}
                onOpenChange={setOpen}
                clienteSelecionado={clienteSelecionado}
            />

            <DetailsDialog
                open={novoOpen}
                onOpenChange={setNovoOpen}
                clienteSelecionado={null}
                isNew
            />
        </div>
    )
}
