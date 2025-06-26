import { Cliente } from "../types/Clients"

const BASE_URL = "http://localhost:8080/clients"

export async function getClientes(): Promise<Cliente[]> {
    const token = localStorage.getItem("authToken")
    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.")
    }

    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erro ao buscar clientes")
    }

    return await response.json()
}

export async function createCliente(cliente: Omit<Cliente, "id">, token: string) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cliente),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erro ao salvar cliente")
    }
}

export async function deleteCliente(id: string, token: string) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erro ao deletar cliente")
    }
}
