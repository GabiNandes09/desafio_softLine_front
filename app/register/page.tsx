'use client'

import Image from "next/image"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "../_components/InputWithLabel"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [notEqualPasswordError, setNotEqualPasswordError] = useState(false)

    const router = useRouter()
    const toLogin = () => {
        router.push("/")
    }

    const handleRegister = async () => {
        const isUsernameValid = username.trim() !== ""
        const isPasswordValid = password.trim() !== ""
        const isConfirmPasswordValid = confirmPassword.trim() !== ""
        const arePasswordsEqual = password.trim() === confirmPassword.trim()

        setUsernameError(!isUsernameValid)
        setPasswordError(!isPasswordValid)
        setConfirmPasswordError(!isConfirmPasswordValid)
        setNotEqualPasswordError(!arePasswordsEqual)

        if (
            isUsernameValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            arePasswordsEqual
        ) {
            console.log(username.trim(), password.trim())
            const response = await fetch('http://192.168.0.11:8080/auth/register', {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password.trim(),
                }),
            })

            return response.json()
        }
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
                        hasError={usernameError}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <InputWithLabel
                        id="password"
                        labelText={"Password"}
                        hint={"Digite sua senha"}
                        value={password}
                        type="password"
                        hasError={passwordError}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputWithLabel
                        id="confirmPassword"
                        labelText={"Confirmar senha"}
                        hint={"Digite sua senha"}
                        type="password"
                        value={confirmPassword}
                        hasError={confirmPasswordError}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {notEqualPasswordError && (
                        <Label className="text-red-600">
                            As senhas devem ser iguais
                        </Label>
                    )}

                    <Button className="w-full mt-4" onClick={handleRegister}>
                        Cadastrar
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
