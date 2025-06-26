const BASE_URL = "http://localhost:8080/auth"

export async function registerUser(username: string, password: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erro ao registrar")
    }
}

export async function loginUser(username: string, password: string): Promise<string> {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
        throw new Error("Usuário ou senha inválidos")
    }

    const data = await response.json()
    const token = data.token

    if (!token) {
        throw new Error("Token não retornado pelo servidor")
    }

    return token
}
