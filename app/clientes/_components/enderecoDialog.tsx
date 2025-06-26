"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { InputWithLabel } from "@/app/_components/InputWithLabel"
import { buscarEnderecoPorCep } from "@/src/services/AddressService"

interface EnderecoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  enderecoInicial: Address
  onSave: (endereco: Address) => void
}

const campos = [
  { id: "zipCode", label: "CEP", hint: "Digite o CEP", required: true },
  { id: "street", label: "Rua", hint: "Digite o nome da rua", required: true },
  { id: "number", label: "Número", hint: "Digite o número", required: true },
  { id: "neighborhood", label: "Bairro", hint: "Digite o bairro", required: true },
  { id: "city", label: "Cidade", hint: "Digite a cidade", required: true },
  { id: "state", label: "Estado", hint: "Digite o estado", required: true },
  { id: "country", label: "País", hint: "Digite o país", required: true },
]

export function EnderecoDialog({
  open,
  onOpenChange,
  enderecoInicial,
  onSave,
}: EnderecoDialogProps) {
  const [endereco, setEndereco] = useState<Address>(enderecoInicial)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [loadingCep, setLoadingCep] = useState(false)
  const [cepError, setCepError] = useState("")
  const numeroRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEndereco(enderecoInicial)
    setErrors({})
    setCepError("")
  }, [enderecoInicial, open])

  const handleChange = (field: keyof Address, value: string) => {
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
      const data = await buscarEnderecoPorCep(cepLimpo)

      setEndereco((prev) => ({
        ...prev,
        street: data.logradouro || "",
        neighborhood: data.bairro || "",
        city: data.localidade || "",
        state: data.uf || "",
        country: "Brasil",
      }))
      setTimeout(() => numeroRef.current?.focus(), 50)
    } catch (error: any) {
      setCepError(error.message || "Erro ao buscar CEP")
      setEndereco((prev) => ({
        ...prev,
        street: "",
        neighborhood: "",
        city: "",
        state: "",
      }))
    } finally {
      setLoadingCep(false)
    }
  }


  const validateFields = () => {
    const newErrors: Record<string, boolean> = {}
    campos.forEach(({ id, required }) => {
      if (required && !endereco[id as keyof Address]?.trim()) {
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
        {loadingCep && <p className="text-sm text-blue-500">Buscando endereço...</p>}
        {cepError && <p className="text-sm text-red-500">{cepError}</p>}
        <div className="space-y-4">
          {campos.map(({ id, label, hint }) => {
            const disabled = loadingCep && id !== "zipCode"
            return (
              <InputWithLabel
                key={id}
                id={id}
                labelText={label}
                hint={hint}
                value={endereco[id as keyof Address]}
                onChange={(e) => handleChange(id as keyof Address, e.target.value)}
                onBlur={id === "zipCode" ? () => buscarCep(endereco.zipCode) : undefined}
                hasError={!!errors[id]}
                disabled={disabled}
                ref={id === "number" ? numeroRef : undefined}
              />
            )
          })}
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
