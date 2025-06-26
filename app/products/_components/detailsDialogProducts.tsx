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
import { toast } from "sonner"
import { ConfirmDeleteDialog } from "@/app/clientes/_components/confirmDeleteDialog"
import { createProduto, deleteProduto, updateProduto } from "@/src/services/ProductService"

interface DetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  produtoSelecionado: Product | null
  isNew?: boolean
  onProdutoAdicionado?: () => void
  onProdutoDeletado?: () => void
}

export function DetailsDialog({
  open,
  onOpenChange,
  produtoSelecionado,
  isNew = false,
  onProdutoAdicionado,
  onProdutoDeletado,
}: DetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [produtoEditado, setProdutoEditado] = useState<Product | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  useEffect(() => {
    if (isNew) {
      setProdutoEditado({
        code: "",
        barCode: "",
        description: "",
        price: "",
        grossWeight: "",
        netWeight: "",
      })
      setIsEditing(true)
    } else if (produtoSelecionado) {
      setProdutoEditado(produtoSelecionado)
      setIsEditing(false)
    }
  }, [produtoSelecionado, open, isNew])

  const handleChange = (field: keyof Product, value: string) => {
    if (!produtoEditado) return
    setProdutoEditado({ ...produtoEditado, [field]: value })
  }

  const handleSave = async () => {
    if (!produtoEditado) return

    try {
      if (isNew) {
        const { code, ...produtoSemCodigo } = produtoEditado
        await createProduto(produtoSemCodigo)
        toast.success("Produto criado com sucesso")
      } else {
        await updateProduto(produtoEditado)
        toast.success("Produto atualizado com sucesso")
      }

      onOpenChange(false)
      onProdutoAdicionado?.()
      setIsEditing(false)
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Erro ao salvar produto")
    }
  }


  const handleDelete = async () => {
    if (!produtoSelecionado) return

    try {
      await deleteProduto(produtoSelecionado.code)
      toast.success("Produto deletado com sucesso")
      setConfirmDeleteOpen(false)
      onOpenChange(false)
      onProdutoDeletado?.()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Erro ao deletar produto")
    }
  }


  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              {isNew ? "Novo Produto" : "Detalhes do Produto"}
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

          {produtoEditado && (
            <div className="space-y-3 text-sm">
              {(
                [
                  { label: "Código", field: "code" },
                  { label: "Descrição", field: "description" },
                  { label: "Código de Barras", field: "barCode" },
                  { label: "Valor de Venda", field: "price" },
                  { label: "Peso Bruto", field: "grossWeight" },
                  { label: "Peso Líquido", field: "netWeight" },
                ] as { label: string, field: keyof Product }[]
              ).map(({ label, field }) => (
                <div key={field}>
                  <p className="font-semibold">{label}:</p>
                  {isEditing ? (
                    <Input
                      value={produtoEditado[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      disabled={field === "code" && !isNew}
                    />
                  ) : (
                    <p>{produtoEditado[field]}</p>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSave}>
                    {isNew ? "Criar Produto" : "Salvar alterações"}
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
    </>
  )
}
