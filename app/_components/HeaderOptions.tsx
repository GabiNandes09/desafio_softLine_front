'use client'

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface HeaderOptionsProps {
    onOptionsClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function HeaderOptions({ onOptionsClick }: HeaderOptionsProps) {
    const router = useRouter()

    const handleLogout = () => {
        // Aqui você pode limpar tokens ou estado de autenticação, se necessário

        router.replace("/")
    }

    return (
        <div className="flex items-center justify-between mb-8 max-w-[70%] mx-auto">
            <Image src="/logo_softline.png" alt="Logo" width={100} height={100} />
            <div className="flex gap-2">
                <Button variant="outline" onClick={onOptionsClick}>
                    Opções
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}
