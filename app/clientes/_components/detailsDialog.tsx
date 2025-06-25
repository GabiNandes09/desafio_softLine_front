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

interface Cliente {
    codigo: string
    nome: string
    fantasia: string
    documento: string
    endereco: string
}

interface Endereco {
    cep: string
    rua: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
}

interface DetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    clienteSelecionado: Cliente | null
    isNew?: boolean
}

export function DetailsDialog({
    open,
    onOpenChange,
    clienteSelecionado,
    isNew = false,
}: DetailsDialogProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [clienteEditado, setClienteEditado] = useState<Cliente | null>(null)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const [enderecoDialogOpen, setEnderecoDialogOpen] = useState(false)
    const [enderecoEditado, setEnderecoEditado] = useState<Endereco>({
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
    })

    useEffect(() => {
        if (isNew) {
            setClienteEditado({
                codigo: "",
                nome: "",
                fantasia: "",
                documento: "",
                endereco: "",
            })
            setIsEditing(true)
            setEnderecoEditado({
                cep: "",
                rua: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                estado: "",
            })
        } else if (clienteSelecionado) {
            setClienteEditado(clienteSelecionado)
            setEnderecoEditado(parseEndereco(clienteSelecionado.endereco))
            setIsEditing(false)
        }
    }, [clienteSelecionado, open, isNew])

    function parseEndereco(enderecoStr: string): Endereco {
        const parts = enderecoStr.split(",").map((p) => p.trim())
        return {
            cep: parts[0] || "",
            rua: parts[1] || "",
            numero: parts[2] || "",
            complemento: parts[3] || "",
            bairro: parts[4] || "",
            cidade: parts[5] || "",
            estado: parts[6] || "",
        }
    }

    function formatEndereco(endereco: Endereco): string {
        return [
            endereco.cep,
            endereco.rua,
            endereco.numero,
            endereco.complemento,
            endereco.bairro,
            endereco.cidade,
            endereco.estado,
        ].filter(Boolean).join(", ")
    }

    const handleChange = (field: keyof Cliente, value: string) => {
        if (!clienteEditado) return
        setClienteEditado({ ...clienteEditado, [field]: value })
    }

    const handleSave = () => {
        if (!clienteEditado) return
        clienteEditado.endereco = formatEndereco(enderecoEditado)

        if (isNew) {
            console.log("Criar cliente:", clienteEditado)
        } else {
            console.log("Cliente editado:", clienteEditado)
        }
        onOpenChange(false)
    }

    const handleDelete = () => {
        console.log("Excluir cliente:", clienteSelecionado?.codigo)
        setConfirmDeleteOpen(false)
        onOpenChange(false)
    }

    const handleEnderecoSave = (endereco: Endereco) => {
        setEnderecoEditado(endereco)
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
                            {["codigo", "nome", "fantasia", "documento"].map((field) => (
                                <div key={field}>
                                    <p className="font-semibold capitalize">{field}:</p>
                                    {isEditing ? (
                                        <Input
                                            value={clienteEditado[field as keyof Cliente]}
                                            onChange={(e) =>
                                                handleChange(field as keyof Cliente, e.target.value)
                                            }
                                        />
                                    ) : (
                                        <p>{clienteEditado[field as keyof Cliente]}</p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <p className="font-semibold capitalize">endereco:</p>
                                <p>{clienteEditado.endereco}</p>
                                {isEditing && (
                                    <Button
                                        className="mt-2"
                                        onClick={() => setEnderecoDialogOpen(true)}
                                    >
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
