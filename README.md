T# AtividadeAuth-Frontend
Frontend da atividade de authentication

# Frontend Lista de Compras

Este é o frontend para a aplicação de Lista de Compras, desenvolvido com React e integrado com uma API backend para autenticação e gerenciamento de itens.

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Gerenciamento de itens da lista de compras (adicionar, visualizar, editar, excluir)
- Proteção de rotas para usuários autenticados
- Feedback visual com toasts para ações do usuário

## Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM
- Backend da aplicação rodando (API de Lista de Compras)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ROpeixoto/AtividadeAuth-Frontend.git
   cd AtividadeAuth-Frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   VITE_API_URL=https://sua-api-backend.vercel.app
   ```
   Substitua a URL pelo endereço do seu backend.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   
   Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

## Build para Produção

Para gerar uma versão de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist` e podem ser servidos por qualquer servidor web estático.

## Tecnologias Utilizadas

- React
- React Router DOM (para navegação)
- Axios (para requisições HTTP)
- React Toastify (para notificações)
- Vite (para build e desenvolvimento)

## Estrutura do Projeto

- `src/pages/`: Componentes de página (Login, Registro, Dashboard)
- `src/components/`: Componentes reutilizáveis
- `src/services/`: Serviços para comunicação com a API
- `src/contexts/`: Contextos React (AuthContext para autenticação)
- `src/styles/`: Arquivos CSS


Link para visualizar o trabalho funcionando: https://www.loom.com/share/55615eb6af5e46649917ee3f273e620e
