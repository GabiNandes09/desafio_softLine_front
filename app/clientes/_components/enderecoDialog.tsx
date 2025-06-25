import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { InputWithLabel } from "@/app/_components/InputWithLabel"

interface Endereco {
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
}

interface EnderecoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  enderecoInicial: Endereco
  onSave: (endereco: Endereco) => void
}

const campos = [
  { id: "cep", label: "CEP", hint: "Digite o CEP", required: true },
  { id: "rua", label: "Rua", hint: "Digite o nome da rua", required: true },
  { id: "numero", label: "Número", hint: "Digite o número", required: true },
  { id: "complemento", label: "Complemento", hint: "Digite complemento (opcional)", required: false },
  { id: "bairro", label: "Bairro", hint: "Digite o bairro", required: true },
  { id: "cidade", label: "Cidade", hint: "Digite a cidade", required: true },
  { id: "estado", label: "Estado", hint: "Digite o estado", required: true },
]

export function EnderecoDialog({
  open,
  onOpenChange,
  enderecoInicial,
  onSave,
}: EnderecoDialogProps) {
  const [endereco, setEndereco] = useState<Endereco>(enderecoInicial)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [loadingCep, setLoadingCep] = useState(false)
  const [cepError, setCepError] = useState("")

  useEffect(() => {
    setEndereco(enderecoInicial)
    setErrors({})
    setCepError("")
  }, [enderecoInicial, open])

  const handleChange = (field: keyof Endereco, value: string) => {
    setEndereco((prev) => ({ ...prev, [field]: value }))
  }

  async function buscarCep(cep: string) {
    const cepLimpo = cep.replace(/\D/g, "")
    if (cepLimpo.length !== 8) {
      setCepError("CEP inválido")
      return
    }
    setLoadingCep(true)
    setCepError("")

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await response.json()

      if (data.erro) {
        setCepError("CEP não encontrado")
        setEndereco((prev) => ({
          ...prev,
          rua: "",
          bairro: "",
          cidade: "",
          estado: "",
        }))
      } else {
        setEndereco((prev) => ({
          ...prev,
          rua: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }))
        setCepError("")
      }
    } catch (error) {
      setCepError("Erro ao buscar CEP")
    } finally {
      setLoadingCep(false)
    }
  }

  const validateFields = () => {
    const newErrors: Record<string, boolean> = {}
    campos.forEach(({ id, required }) => {
      if (required && !endereco[id as keyof Endereco]?.trim()) {
        newErrors[id] = true
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveClick = () => {
    if (!validateFields()) return
    onSave(endereco)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Endereço</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {campos.map(({ id, label, hint }) => (
            <InputWithLabel
              key={id}
              id={id}
              labelText={label}
              hint={hint}
              value={endereco[id as keyof Endereco]}
              onChange={(e) => handleChange(id as keyof Endereco, e.target.value)}
              hasError={!!errors[id]}
              {...(id === "cep"
                ? {
                    onBlur: () => buscarCep(endereco.cep),
                  }
                : {})}
            />
          ))}
          {loadingCep && <p className="text-sm text-blue-500">Buscando endereço...</p>}
          {cepError && <p className="text-sm text-red-500">{cepError}</p>}
        </div>

        <div className="pt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveClick}>Salvar Endereço</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
