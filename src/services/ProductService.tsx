const BASE_URL = "http://localhost:8080/products"

export async function getProdutos(): Promise<Product[]> {
    const token = localStorage.getItem("authToken")
    if (!token) throw new Error("Token não encontrado. Faça login novamente.")

    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erro ao buscar produtos")
    }

    return await response.json()
}

export async function createProduto(produto: Omit<Product, "code">): Promise<void> {
    const token = localStorage.getItem("authToken")
    if (!token) throw new Error("Token não encontrado. Faça login novamente.")

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produto),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erro ao criar produto")
    }
}

export async function deleteProduto(code: string): Promise<void> {
    const token = localStorage.getItem("authToken")
    if (!token) throw new Error("Token não encontrado. Faça login novamente.")

    const response = await fetch(`${BASE_URL}/${code}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erro ao deletar produto")
    }
}

export async function updateProduto(produto: Product): Promise<void> {
    const token = localStorage.getItem("authToken")
    if (!token) throw new Error("Token não encontrado. Faça login novamente.")

    const response = await fetch(`${BASE_URL}/${produto.code}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produto),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erro ao atualizar produto")
    }
}