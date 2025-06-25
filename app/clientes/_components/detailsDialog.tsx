'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { useState, useEffect } from "react"
import { ConfirmDeleteDialog } from "./confirmDeleteDialog"
import { EnderecoDialog } from "./enderecoDialog"
import { toast } from "sonner"
import { Cliente } from "@/app/src/types/Cliente"

interface DetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    clienteSelecionado: Cliente | null
    isNew?: boolean
    onClienteAdicionado?: () => void
    onClienteDeletado?: () => void
}

export function DetailsDialog({
    open,
    onOpenChange,
    clienteSelecionado,
    isNew = false,
    onClienteAdicionado,
    onClienteDeletado,
}: DetailsDialogProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [clienteEditado, setClienteEditado] = useState<Cliente | null>(null)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const [enderecoDialogOpen, setEnderecoDialogOpen] = useState(false)
    const [enderecoEditado, setEnderecoEditado] = useState({
        zipCode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        country: ""
    })

    useEffect(() => {
        if (isNew) {
            setClienteEditado({
                id: "",
                name: "",
                fantasyName: "",
                document: "",
                address: {
                    zipCode: "",
                    street: "",
                    number: "",
                    neighborhood: "",
                    city: "",
                    state: "",
                    country: ""
                }
            })
            setEnderecoEditado({
                zipCode: "",
                street: "",
                number: "",
                neighborhood: "",
                city: "",
                state: "",
                country: ""
            })
            setIsEditing(true)
        } else if (clienteSelecionado) {
            setClienteEditado(clienteSelecionado)
            setEnderecoEditado(clienteSelecionado.address)
            setIsEditing(false)
        }
    }, [clienteSelecionado, open, isNew])

    const handleChange = (field: keyof Cliente, value: string) => {
        if (!clienteEditado) return
        setClienteEditado({ ...clienteEditado, [field]: value })
    }

    const handleSave = async () => {
        if (!clienteEditado) return

        try {
            const token = localStorage.getItem("authToken")
            if (!token) {
                toast.error("Token não encontrado. Faça login novamente.")
                return
            }

            const clienteRequest = {
                name: clienteEditado.name,
                fantasyName: clienteEditado.fantasyName,
                document: clienteEditado.document,
                address: enderecoEditado,
            }

            const response = await fetch("http://localhost:8080/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(clienteRequest),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Erro ao salvar cliente")
            }

            toast.success("Cliente criado com sucesso")
            onOpenChange(false)
            onClienteAdicionado?.()

        } catch (error) {
            console.error(error)
            toast.error("Erro ao salvar cliente")
        }
    }

    const handleDelete = async () => {
        if (!clienteSelecionado) return

        try {
            const token = localStorage.getItem("authToken")
            if (!token) {
                toast.error("Token não encontrado. Faça login novamente.")
                return
            }

            const response = await fetch(`http://localhost:8080/clients/${clienteSelecionado.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Erro ao deletar cliente")
            }

            toast.success("Cliente deletado com sucesso")
            setConfirmDeleteOpen(false)
            onOpenChange(false)
            onClienteDeletado?.()

        } catch (error) {
            console.error(error)
            toast.error("Erro ao deletar cliente")
        }
    }

    const handleEnderecoSave = (endereco: typeof enderecoEditado) => {
        setEnderecoEditado(endereco)
        if (clienteEditado) {
            setClienteEditado({ ...clienteEditado, address: endereco })
        }
        setEnderecoDialogOpen(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader className="flex justify-between items-center">
                        <DialogTitle className="flex items-center gap-2">
                            {isNew ? "Novo Cliente" : "Detalhes do Cliente"}
                            {!isNew && (
                                <div className="flex gap-2 ml-2">
                                    <Pencil
                                        size={18}
                                        className="cursor-pointer text-muted-foreground hover:text-black transition"
                                        onClick={() => setIsEditing(!isEditing)}
                                    />
                                    <Trash
                                        size={18}
                                        className="cursor-pointer text-red-500 hover:text-red-700 transition"
                                        onClick={() => setConfirmDeleteOpen(true)}
                                    />
                                </div>
                            )}
                        </DialogTitle>
                    </DialogHeader>

                    {clienteEditado && (
                        <div className="space-y-3 text-sm">
                            {["name", "fantasyName", "document"].map((field) => (
                                <div key={field}>
                                    <p className="font-semibold capitalize">{field}:</p>
                                    {isEditing ? (
                                        <Input
                                            value={clienteEditado[field as keyof Cliente] as string}
                                            onChange={(e) =>
                                                handleChange(field as keyof Cliente, e.target.value)
                                            }
                                        />
                                    ) : (
                                        <p>{clienteEditado.address.city}</p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <p className="font-semibold capitalize">Endereço:</p>
                                <p>
                                    {[
                                        enderecoEditado.zipCode,
                                        enderecoEditado.street,
                                        enderecoEditado.number,
                                        enderecoEditado.neighborhood,
                                        enderecoEditado.city,
                                        enderecoEditado.state,
                                        enderecoEditado.country
                                    ]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                                {isEditing && (
                                    <Button className="mt-2" onClick={() => setEnderecoDialogOpen(true)}>
                                        Editar Endereço
                                    </Button>
                                )}
                            </div>

                            {isEditing && (
                                <div className="pt-4 flex justify-end">
                                    <Button onClick={handleSave}>
                                        {isNew ? "Criar Cliente" : "Salvar alterações"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>

                {!isNew && (
                    <ConfirmDeleteDialog
                        open={confirmDeleteOpen}
                        onOpenChange={setConfirmDeleteOpen}
                        onConfirm={handleDelete}
                    />
                )}
            </Dialog>

            <EnderecoDialog
                open={enderecoDialogOpen}
                onOpenChange={setEnderecoDialogOpen}
                enderecoInicial={enderecoEditado}
                onSave={handleEnderecoSave}
            />
        </>
    )
}
