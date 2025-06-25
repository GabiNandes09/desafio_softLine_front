'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const goToClientes = () => {
    router.push("/clientes")
  }

  const goToProdutos = () => {
    router.push("/products")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col gap-4 w-full max-w-xs text-center">
        <Button onClick={goToClientes} className="text-lg py-6">
          Clientes
        </Button>
        <Button onClick={goToProdutos} variant="outline" className="text-lg py-6">
          Produtos
        </Button>
      </div>
    </div>
  )
}
