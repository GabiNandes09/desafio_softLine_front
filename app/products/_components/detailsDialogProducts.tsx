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
import { ConfirmDeleteDialog } from "@/app/clientes/_components/confirmDeleteDialog"

interface Produto {
  codigo: string
  descricao: string
  codigoBarras: string
  valorVenda: string
  pesoBruto: string
  pesoLiquido: string
}

interface DetailsDialogProdutoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  produtoSelecionado: Produto | null
  isNew?: boolean
}

export function DetailsDialog({
  open,
  onOpenChange,
  produtoSelecionado,
  isNew = false,
}: DetailsDialogProdutoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [produtoEditado, setProdutoEditado] = useState<Produto | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  useEffect(() => {
    if (isNew) {
      setProdutoEditado({
        codigo: "",
        descricao: "",
        codigoBarras: "",
        valorVenda: "",
        pesoBruto: "",
        pesoLiquido: "",
      })
      setIsEditing(true)
    } else if (produtoSelecionado) {
      setProdutoEditado(produtoSelecionado)
      setIsEditing(false)
    }
  }, [produtoSelecionado, open, isNew])

  const handleChange = (field: keyof Produto, value: string) => {
    if (!produtoEditado) return
    setProdutoEditado({ ...produtoEditado, [field]: value })
  }

  const handleSave = () => {
    if (isNew) {
      console.log("Criar produto:", produtoEditado)
    } else {
      console.log("Produto editado:", produtoEditado)
    }
    onOpenChange(false)
  }

  const handleDelete = () => {
    console.log("Excluir produto:", produtoSelecionado?.codigo)
    setConfirmDeleteOpen(false)
    onOpenChange(false)
  }

  return (
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
                "codigo",
                "descricao",
                "codigoBarras",
                "valorVenda",
                "pesoBruto",
                "pesoLiquido",
              ] as (keyof Produto)[]
            ).map((field) => (
              <div key={field}>
                <p className="font-semibold capitalize">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </p>
                {isEditing ? (
                  <Input
                    value={produtoEditado[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
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
  )
}
