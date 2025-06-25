'use client'

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { InputWithLabel } from "./_components/InputWithLabel"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)


  const router = useRouter()
  const toRegister = () => {
    router.push("/register")
  }

  const handleLogin = () => {
    const isUsernameValid = username.trim() !== ""
    const isPasswordValid = password.trim() !== ""

    setUsernameError(!isUsernameValid)
    setPasswordError(!isPasswordValid)

    if (isUsernameValid && isPasswordValid) {
      console.log("Login:", { username, password })

    }
  }


  const handleRegister = () => {
    toRegister()
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
          <InputWithLabel
            id="username"
            labelText={"Username"}
            hint={"Digite seu nome de usuário"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            hasError={usernameError}
          />
          <InputWithLabel
            id="password"
            labelText={"Password"}
            hint={"Digite sua senha"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={passwordError}
          />
          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={handleLogin}>Login</Button>
            <Button variant="outline" onClick={handleRegister}>Registrar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
