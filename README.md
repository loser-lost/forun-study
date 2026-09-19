# 💬 Forum Study API

Uma API RESTful simplificada de fórum desenvolvida com **NestJS**, focada em estudos e boas práticas de desenvolvimento back-end, autenticação.

## 🚀 Sobre o Projeto

Este repositório foi criado com o objetivo de praticar a construção de APIs modernas usando **NestJS**. O projeto foi desenvolvido acompanhando as instruções e conceitos apresentados [nesta videoaula no YouTube](https://www.youtube.com/watch?v=ZJ1Y7BnUmvY&list=PLR8JXremim5AdjhggWtqzgSXPYZ_V9x2b&index=15).

A aplicação simula a estrutura básica de um fórum de perguntas e respostas, cobrindo os domínios principais:

* **Autenticação (`Auth`):** Registro e login com tokens JWT e hash de senhas (`bcrypt`).
* **Usuários (`Users`):** Gerenciamento de usuários da plataforma.
* **Perguntas (`Questions`):** Criação, edição, listagem e exclusão de perguntas.
* **Respostas (`Answers`):** Envio e gerenciamento de respostas vinculadas às perguntas.

## 🛠️ Tecnologias Utilizadas

* **Framework:** [NestJS](https://nestjs.com/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **ORM / Banco de Dados:** [Prisma ORM](https://www.prisma.io/) + [SQLite](https://www.sqlite.org/) (`better-sqlite3`)
* **Autenticação:** JWT (`@nestjs/jwt`) + `bcrypt`
* **Testes:** [Vitest](https://vitest.dev/) (Unitários e E2E)
* **Linter & Formatação:** [Oxlint](https://oxc-project.github.io/) + [Prettier](https://prettier.io/)

## 📌 Funcionalidades & Endpoints Base

### 🔐 Autenticação (`/auth`)
* `POST /auth/register` - Cadastro de novos usuários
* `POST /auth/login` - Autenticação e emissão do token JWT

### 👤 Usuários (`/users`)
* `GET /users/me` - Retorna os dados do usuário autenticado

### ❓ Perguntas (`/questions`)
* `GET /questions` - Lista todas as perguntas
* `POST /questions` - Cria uma nova pergunta *(Requer autenticação)*
* `GET /questions/:id` - Busca detalhes de uma pergunta
* `DELETE /questions/:id` - Remove uma pergunta do usuário

### 💬 Respostas (`/answers`)
* `POST /questions/:questionId/answers` - Adiciona uma resposta a uma pergunta *(Requer autenticação)*
* `GET /questions/:questionId/answers` - Lista respostas de uma pergunta

## ⚙️ Como executar o projeto

### Pré-requisitos
* **Node.js** (Versão 18 ou superior recomendada)
* **npm** ou seu gerenciador de pacotes preferido

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/forun-study.git
   cd forun-study
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com base nas configurações necessárias (ex: `DATABASE_URL`, `JWT_SECRET`).

4. **Execute as Migrações do Banco de Dados (Prisma):**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run start:dev
   ```
   A aplicação estará disponível em `http://localhost:3000`.

## 🧪 Testes e Qualidade de Código

O projeto utiliza **Vitest** para a execução de testes unitários e de integração (E2E), e **Oxlint** para análise estática de código.

* **Rodar os testes unitários:**
  ```bash
  npm run test
  ```
* **Rodar os testes em modo watch:**
  ```bash
  npm run test:watch
  ```
* **Rodar os testes de integração (E2E):**
  ```bash
  npm run test:e2e
  ```
* **Verificar a cobertura de testes:**
  ```bash
  npm run test:cov
  ```
* **Executar o Linter (Oxlint):**
  ```bash
  npm run lint
  ```
* **Formatar o código (Prettier):**
  ```bash
  npm run format
  ```

## 📜 Licença e Créditos

Este projeto é voltado exclusivamente para fins de estudo e aprendizado, baseado nas aulas ministradas na [playlist/videoaula no YouTube NestJs Na Prática](https://www.youtube.com/watch?v=ZJ1Y7BnUmvY&list=PLR8JXremim5AdjhggWtqzgSXPYZ_V9x2b&index=15).