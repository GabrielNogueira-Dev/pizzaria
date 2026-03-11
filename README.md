🍕 Sistema Completo para Pizzaria — Web + Mobile + Backend
Este projeto foi desenvolvido com o objetivo de modernizar e agilizar o fluxo de pedidos entre salão e cozinha de uma pizzaria, integrando aplicação web, aplicativo mobile e API backend em um único ecossistema.

🚀 Tecnologias Utilizadas
Backend
Node.js

TypeScript - PostgreSQL - Prisma ORM - JWT Authentication - Hash de senha (bcrypt) - Upload de imagens com Cloudinary

Frontend Web
Next.js - React.js - TypeScript - UI/UX responsiva e otimizada

Mobile (Garçom)
React Native - Expo

Consumo da mesma API do backend

🖥️ WEB — Interface Administrativa
🔐 Login
<img width="1911" alt="login web" src="https://github.com/user-attachments/assets/a44bc403-540b-4c2e-ba07-7cec5b81a406" />

📝 Cadastro
<img width="1902" alt="cadastro web" src="https://github.com/user-attachments/assets/f394cafd-c358-4ee5-a087-167d62c6c22d" />

🍕 Produtos
Lista de Produtos
<img width="1905" alt="produtos web" src="https://github.com/user-attachments/assets/638619ae-f547-47f3-a89f-7b87745e2bca" />

Novo Produto
<img width="1904" alt="novo produto web" src="https://github.com/user-attachments/assets/4c19a378-875b-409f-9d32-d99cd4180689" />

🗂️ Categorias
Criar Categoria
<img width="1907" alt="nova categoria web" src="https://github.com/user-attachments/assets/baa82251-7e56-4a42-b028-2e080c9b7046" />

Lista de Categorias
<img width="1901" alt="categorias web" src="https://github.com/user-attachments/assets/a2c8df52-2db5-4647-8319-1f9448641ce6" />

📦 Pedidos (Cozinha)
Lista de Pedidos
<img width="1904" alt="pedidos web" src="https://github.com/user-attachments/assets/61defae2-2cdd-477c-88d0-693e6e3275e6" />

Detalhes do Pedido
<img width="1903" alt="detalhes do pedido web" src="https://github.com/user-attachments/assets/62b638e8-5d22-4b6d-a278-e0e1a6b1cfd6" />

📱 MOBILE — Aplicativo do Garçom
🔐 Login
(adicione a imagem se quiser)

🍽️ Criação de Mesa
<img width="373" alt="criacao mesa mobile" src="https://github.com/user-attachments/assets/5d35ee18-a8e8-4f19-a33e-fbc616fa30cf" />

➕ Adicionar Itens
<img width="369" alt="adicionar itens a mesa mobile" src="https://github.com/user-attachments/assets/7dd76d8f-3717-4eba-a2fb-fe503abd415d" />

<img width="546" alt="itens mobile" src="https://github.com/user-attachments/assets/b4e8e6a2-dea0-4613-a149-c9150d471b48" />

📤 Enviar Pedido
<img width="367" alt="enviar pedido mobile" src="https://github.com/user-attachments/assets/ab38714e-3551-4d8b-9898-1e2e87a39f36" />

🔗 Integração Completa
Tanto o web quanto o mobile consomem a mesma API, garantindo:

Padronização

Agilidade

Menos duplicação de lógica

Manutenção simplificada

🎯 Funcionalidades Principais
Login seguro (JWT + hash de senha)

Controle de acesso (ADMIN)

Cadastro de categorias

Cadastro de produtos com imagem (Cloudinary)

Abertura de mesas

Adição de itens ao pedido

Revisão e exclusão antes do envio

Envio para cozinha (draft → false)

Painel da cozinha atualizado em tempo real
