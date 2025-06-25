interface Endereco {
  zipCode: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  country: string
}

function formatarEndereco(endereco: Endereco): string {
  return [
    endereco.zipCode,
    endereco.street,
    endereco.number,
    endereco.neighborhood,
    endereco.city,
    endereco.state,
    endereco.country
  ]
    .filter(Boolean)
    .join(", ")
}