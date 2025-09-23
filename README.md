# 🍲 Marmiteria Low-Fit - E-commerce

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Repositório do projeto de e-commerce completo para a Marmiteria Low-Fit, um sistema de pedidos online com cardápio dinâmico, montagem de combos e checkout de pagamento seguro integrado com a API da Stripe.

---

### 📋 Índice

* [Sobre o Projeto](#-sobre-o-projeto)
* [✨ Funcionalidades](#-funcionalidades)
* [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [🔧 Como Executar o Projeto](#-como-executar-o-projeto)
* [📈 Próximos Passos](#-próximos-passos)
* [ licença](#-licença)

---

### 📖 Sobre o Projeto

Este projeto foi desenvolvido para fornecer uma solução de vendas online completa para um negócio de marmitas fitness. O sistema permite que clientes naveguem pelo cardápio, montem seus próprios combos de refeições com base em planos pré-definidos, gerenciem seus carrinhos de compra e finalizem seus pedidos de forma segura através de um checkout transparente processado pela Stripe.

O frontend foi construído com **Next.js (React)** para uma experiência de usuário moderna e reativa, enquanto o backend em **Python com FastAPI** oferece uma API robusta e de alta performance para gerenciar a lógica de negócio e a integração de pagamentos.

---

### ✨ Funcionalidades

-   [x] **Cardápio de Produtos:** Visualização dos itens disponíveis.
-   [x] **Montagem de Combos:** Interface para o cliente montar kits de marmitas personalizados.
-   [x] **Carrinho de Compras:** Adicionar, remover e atualizar a quantidade de itens.
-   [x] **Modal de Upsell:** Sugestão inteligente de produtos adicionais antes de finalizar a compra.
-   [x] **Integração com Stripe:** Checkout seguro para processamento de pagamentos com cartão.
-   [x] **Validação de Pagamento:** Confirmação do pedido após o pagamento bem-sucedido.

---

### 🚀 Tecnologias Utilizadas

O projeto é dividido em duas partes principais:

**Frontend:**
* **[Next.js](https://nextjs.org/)** (Framework React)
* **[TypeScript](https://www.typescriptlang.org/)**
* **[Tailwind CSS](https://tailwindcss.com/)** para estilização
* **[shadcn/ui](https://ui.shadcn.com/)** para componentes de UI

**Backend:**
* **[Python](https://www.python.org/)**
* **[FastAPI](https://fastapi.tiangolo.com/)** (Framework para API)
* **[Stripe SDK](https://stripe.com/docs/api)** para integração de pagamentos
* **[Uvicorn](https://www.uvicorn.org/)** como servidor ASGI

---

### 🔧 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em seu ambiente local.

#### **Pré-requisitos**
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [Python](https://www.python.org/downloads/) (versão 3.10 ou superior)
* Conta ativa no [Stripe](https://dashboard.stripe.com/register)

#### **1. Clonar o Repositório**
```bash
git clone [https://github.com/seu-usuario/marmiteria-low-fit.git](https://github.com/seu-usuario/marmiteria-low-fit.git)
cd marmiteria-low-fit
```

#### **2. Configurar e Rodar o Backend**
```bash
# Navegue até a pasta do backend
cd backend

# Crie e ative um ambiente virtual
python -m venv venv
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate

# Instale as dependências (crie um arquivo requirements.txt primeiro)
pip freeze > requirements.txt
pip install -r requirements.txt

# Crie um arquivo .env e adicione suas chaves
cp .env.example .env
# Preencha o .env com suas informações
# STRIPE_SECRET_KEY=sk_test_...
# FRONTEND_URL=http://localhost:3000

# Rode o servidor
python -m uvicorn main:app --reload --port 8080
```

#### **3. Configurar e Rodar o Frontend**
```bash
# Em um novo terminal, navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Crie seu arquivo de variáveis de ambiente (se necessário)
# Geralmente não é necessário para a URL do backend em modo de desenvolvimento

# Rode a aplicação
npm run dev
```

Após seguir os passos, a aplicação estará disponível em `http://localhost:3000` e o backend em `http://localhost:8080`.

---
Feito por Kaiki Nattan
