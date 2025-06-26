
# Desafio Softline - Frontend

Projeto frontend desenvolvido com Next.js e TypeScript.

## Descrição

Este projeto é a interface frontend do desafio técnico Softline, consumindo a API backend em Java com Spring Framework. O sistema possui autenticação JWT, registro, login, e funcionalidades de CRUD para clientes e produtos.

## Tecnologias

- Next.js
- TypeScript
- Shadcn UI
- API ViaCEP para busca de endereços
- Consumo da API backend: https://github.com/GabiNandes09/desafio_softline_api

## Funcionalidades

- Registro de usuários
- Login com autenticação JWT
- Navegação entre listagens de clientes e produtos
- CRUD para clientes e produtos

## Requisitos

- Node.js (gerenciado com NVM, versão 22)
- API backend rodando localmente em http://localhost:8080

## Como executar

1. Certifique-se que o backend está ativo e rodando em `http://localhost:8080`.
2. No terminal, navegue até a pasta do projeto frontend.
3. Use o NVM para selecionar a versão 22 do Node.js:

   ```bash
   nvm use 22
   ```

4. Instale as dependências:

   ```bash
   npm install
   ```

5. Execute o projeto em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Acesse a aplicação em `http://localhost:3000`.

## Estrutura de Pastas

- `_components`: Componentes reutilizáveis do frontend
- `pages`: Páginas da aplicação, incluindo rotas
- `services`: Serviços para chamadas HTTP à API backend
- `public`: Recursos públicos, como imagens e ícones

## Variáveis de Ambiente

- Não utiliza variáveis de ambiente externas. As URLs da API estão configuradas diretamente nos serviços como `localhost`.


