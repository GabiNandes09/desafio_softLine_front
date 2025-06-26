interface ViaCepResponse {
    logradouro?: string
    bairro?: string
    localidade?: string
    uf?: string
    erro?: boolean
}

export async function buscarEnderecoPorCep(cep: string): Promise<ViaCepResponse> {
    const cepLimpo = cep.replace(/\D/g, "")
    if (cepLimpo.length !== 8) {
        throw new Error("CEP inválido")
    }

    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data: ViaCepResponse = await response.json()

    if (data.erro) {
        throw new Error("CEP não encontrado")
    }

    return data
}
