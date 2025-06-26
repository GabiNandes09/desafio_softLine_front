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
import { DetailsDialog } from "./_components/detailsDialog"
import { toast } from "sonner"
import { Cliente } from "../../src/types/Clients"
import { getClientes } from "@/src/services/ClientService"


export default function ClientesPage() {
    const [open, setOpen] = useState(false)
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
    const [novoOpen, setNovoOpen] = useState(false)
    const [clientes, setClientes] = useState<Cliente[]>([])

    const router = useRouter()

    const toOptions = () => {
        router.push("/pageOptions")
    }

    const handleRowClick = (cliente: Cliente) => {
        setClienteSelecionado(cliente)
        setOpen(true)
    }

    const fetchClientes = async () => {
        try {
            const data = await getClientes()
            setClientes(data)
        } catch (error: any) {
            if (error.message?.includes("Token")) {
                toast.error(error.message)
                router.push("/")
            } else {
                toast.error("Erro ao carregar lista de clientes")
                console.error(error)
            }
        }
    }


    useEffect(() => {
        fetchClientes()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <HeaderOptions onOptionsClick={toOptions} />

            <div className="max-w-[70%] mx-auto mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Lista de Clientes</h1>
                <Button className="bg-green-600" onClick={() => setNovoOpen(true)}>
                    Adicionar Cliente
                </Button>
            </div>

            <div className="border rounded-lg shadow-md overflow-auto max-w-[90%] mx-auto bg-white">
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
                                key={cliente.id}
                                className="hover:bg-gray-50 transition-colors"
                                onClick={() => handleRowClick(cliente)}
                            >
                                <TableCell>{cliente.id}</TableCell>
                                <TableCell>{cliente.name}</TableCell>
                                <TableCell>{cliente.fantasyName}</TableCell>
                                <TableCell>{cliente.document}</TableCell>
                                <TableCell>{cliente.address.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DetailsDialog
                open={open}
                onOpenChange={setOpen}
                clienteSelecionado={clienteSelecionado}
                onClienteAdicionado={fetchClientes}
                onClienteDeletado={fetchClientes}
            />

            <DetailsDialog
                open={novoOpen}
                onOpenChange={setNovoOpen}
                clienteSelecionado={null}
                isNew
                onClienteAdicionado={fetchClientes}
            />
        </div>
    )
}
