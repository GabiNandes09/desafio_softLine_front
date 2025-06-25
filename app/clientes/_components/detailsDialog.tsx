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

interface Cliente {
    codigo: string
    nome: string
    fantasia: string
    documento: string
    endereco: string
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

    useEffect(() => {
        if (isNew) {
            // Se estiver criando um novo cliente, campos vazios
            setClienteEditado({
                codigo: "",
                nome: "",
                fantasia: "",
                documento: "",
                endereco: "",
            })
            setIsEditing(true)
        } else if (clienteSelecionado) {
            setClienteEditado(clienteSelecionado)
            setIsEditing(false)
        }
    }, [clienteSelecionado, open, isNew])

    const handleChange = (field: keyof Cliente, value: string) => {
        if (!clienteEditado) return
        setClienteEditado({ ...clienteEditado, [field]: value })
    }

    const handleSave = () => {
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

    return (
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
                        {["codigo", "nome", "fantasia", "documento", "endereco"].map((field) => (
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
    )
}
