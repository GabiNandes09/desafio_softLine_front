interface Address {
  zipCode: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  country: string
}

function formatarEndereco(adress: Address): string {
  return [
    adress.zipCode,
    adress.street,
    adress.number,
    adress.neighborhood,
    adress.city,
    adress.state,
    adress.country
  ]
    .filter(Boolean)
    .join(", ")
}