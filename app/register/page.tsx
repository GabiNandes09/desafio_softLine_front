'use client'

import Image from "next/image"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "../_components/InputWithLabel"

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = () => {
        console.log("Registrando:", { username, password })
        // Lógica para registrar o usuário aqui
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
                    <CardTitle className="text-2xl text-center">Cadastro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <InputWithLabel
                        id="username"
                        labelText={"Username"}
                        hint={"Digite seu nome de usuário"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <InputWithLabel
                        id="password"
                        labelText={"Password"}
                        hint={"Digite sua senha"}
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputWithLabel
                        id="confirmPassword"
                        labelText={"Confirmar senha"}
                        hint={"Digite sua senha"}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button className="w-full mt-4" onClick={handleRegister}>
                        Cadastrar
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
