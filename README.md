# AutoCar ERP Template

Sistema web para gestão de oficina (ERP Automotivo), com front-end em React + TypeScript utilizando shadcn/ui e integração planejada com backend em C# (.NET). [web:208][web:215]

## 🧰 Tecnologias

- React + TypeScript
- Vite (ou Create React App, conforme o setup)
- shadcn/ui + Tailwind CSS
- React Router DOM
- Backend C# (.NET Web API) – integração via HTTP/JSON 

## 🚀 Como rodar o projeto

Clonar o repositório
git clone https://github.com/matheuskendi/AutoCarERPTemplate.git
cd AutoCarERPTemplate

Instalar dependências
npm install

Rodar em modo desenvolvimento
npm run dev


O projeto ficará disponível em algo como:

- `http://localhost:5173` (porta padrão do Vite; confira a porta mostrada no terminal). 

## 📌 Funcionalidades atuais (front-end)

- Login
- Layout com sidebar fixa e navegação sem recarregar página (React Router + MainLayout)
- Dashboard / Home com cards de resumo
- Cadastros:
  - Clientes
  - Veículos
  - Produtos / Serviços
  - Ordens de Serviço
- Listagem de:
  - Clientes
  - Veículos
  - Produtos / Serviços
  - Ordens de Serviço
- Tela de Configurações:
  - Dados de perfil (nome, email)
  - Preferências (tema, idioma, notificações)
  - Alteração de senha (preparada para integração com API) 

## 🗺️ Rotas principais (front)

- `/login` – tela de login (sem sidebar)
- `/` – Home / Dashboard (com sidebar)
- `/dash` – dashboard alternativo (se aplicado)
- `/clientes` – listagem de clientes
- `/clientes/novo` – cadastro de cliente
- `/veiculos` – listagem de veículos
- `/veiculos/novo` – cadastro de veículo
- `/produtos` – listagem de produtos/serviços
- `/produtos/novo` – cadastro de produto/serviço
- `/ordem-servico` – listagem de O.S.
- `/ordem-servico/nova` – abertura de O.S.
- `/configuracoes` – página de configurações do usuário/sistema

Essas rotas são gerenciadas pelo `App.tsx` usando um `MainLayout` com `<Outlet />` para manter a sidebar fixa.

## 🔗 Integração com backend C#

As páginas de listagem e formulários estão preparadas para consumir uma API REST em C#, por exemplo:

- `GET /api/clientes`
- `POST /api/clientes`
- `GET /api/veiculos`
- `POST /api/veiculos`
- `GET /api/produtos`
- `POST /api/produtos`
- `GET /api/ordensservico`
- `POST /api/ordensservico`
- `POST /api/usuarios/trocar-senha`

Basta substituir os dados mockados nos `useEffect` e handlers de formulário por chamadas `fetch`/`axios` apontando para esses endpoints. 

## 📂 Estrutura (resumida)

src/
components/
app-sidebar.tsx
nav-main.tsx
nav-projects.tsx
nav-user.tsx
team-switcher.tsx
ui/
breadcrumb.tsx
sidebar.tsx
table.tsx
button.tsx
input.tsx
card.tsx
select.tsx
switch.tsx
...
layouts/
MainLayout.tsx
pages/
Home.tsx
Login.tsx
Dashboard.tsx
Configuracoes.tsx
clientes/
ClientesList.tsx
CriarClientes.tsx
veiculos/
VeiculosList.tsx
CriarVeiculo.tsx
produtos/
ProdutosList.tsx
CriarProduto.tsx
os/
OsList.tsx
CriarOrdemServico.tsx
App.tsx
main.tsx


Essa estrutura segue boas práticas de organização de projetos React com rotas e layout compartilhado. 

## 🧪 Scripts úteis (ajuste conforme seu package.json)

{
"scripts": {
"dev": "vite", // rodar em desenvolvimento
"build": "vite build", // gerar build de produção
"preview": "vite preview", // servir build para testes locais
"lint": "eslint ."
}
}

