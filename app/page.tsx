'use client'

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log("Login:", { username, password })
    // lógica de autenticação aqui
  }

  const handleRegister = () => {
    console.log("Registrar:", { username, password })
    // lógica de registro aqui
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="flex flex-col items-center">
          <Image
            src="/logo_softline.png"
            alt="Logo da Empresa"
            width={250}
            height={250}
            className="mb-4"
          />
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={handleLogin}>Login</Button>
            <Button variant="outline" onClick={handleRegister}>Registrar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
