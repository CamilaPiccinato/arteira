# Arteira

Marketplace e comunidade de artesanato feito à mão. Aplicação web desenvolvida em **React** onde artesãos publicam suas peças em um feed de comunidade e o público navega por categorias (Crochê, Pintura, Macramê, Miçangas).

Este repositório corresponde à **Etapa 2** do trabalho avaliativo: a migração do protótipo estático (HTML/CSS) para uma aplicação React com pelo menos um **fluxo funcional completo**.

---

## Integrantes

| Integrante | Atividades desenvolvidas |
|------------|--------------------------|
| Camila Piccinato | Estrutura inicial do site (HTML/CSS), tela inicial e página da comunidade |
| Luan Guex | Migração do site para React, CRUD de postagens, login de usuário, controle de dono e upload de foto |

---

## Descrição do sistema

O **Arteira** é uma plataforma que conecta artesãos e clientes. A tela inicial
apresenta o banner da comunidade e as categorias de artesanato. A tela de
**Comunidade** é o coração da aplicação: um feed onde qualquer pessoa pode
publicar, consultar, editar e excluir postagens de peças artesanais, além de
curtir as postagens de outras pessoas.

## Fluxo funcional completo implementado (CRUD de Postagens)

Na página **Comunidade** o usuário realiza a sequência lógica completa:

1. **Cadastrar (Create)** — botão "+" abre um formulário para publicar uma nova
   postagem (artesão, descrição, categoria e imagem), com validação de campos.
2. **Consultar (Read)** — as postagens aparecem no feed em grade.
3. **Editar (Update)** — cada card tem o botão "Editar", que abre o mesmo
   formulário já preenchido para alteração.
4. **Excluir (Delete)** — o botão "Excluir" abre um diálogo de confirmação
   antes de remover a postagem.

Os dados são persistidos no **localStorage** do navegador, funcionando como um
"backend" simplificado — as postagens continuam salvas ao recarregar a página.
(Conforme a atividade permite, não há backend completo; o fluxo funcional é
demonstrado de ponta a ponta.)

### Controle de propriedade (autorização)

Para publicar é preciso **entrar** com um nome de usuário (botão "Entre /
Cadastre-se"). Cada postagem guarda o seu **dono**, e os botões **Editar** e
**Excluir** só aparecem nas postagens do próprio usuário logado — ninguém
edita ou apaga a postagem de outra pessoa.

## Funcionalidades implementadas

- Navegação entre páginas (Home e Comunidade) com **React Router**.
- **Login** simples de usuário (nome + foto de perfil opcional), persistido.
- **CRUD completo** de postagens da comunidade.
- **Autorização**: editar/excluir apenas as próprias postagens.
- **Upload de foto** da peça a partir do computador (com redimensionamento),
  ou escolha entre imagens de exemplo.
- Validação de formulário (campos obrigatórios com mensagens de erro).
- Curtir / descurtir postagens (contador dinâmico).
- Persistência local dos dados (localStorage).
- Layout responsivo fiel ao protótipo original.

## Tecnologias utilizadas

- **React 19**
- **Vite** (build e dev server)
- **React Router DOM** (roteamento)
- **JavaScript (ES2022)**, HTML5 e CSS3
- **localStorage** para persistência

## Estrutura do código

```
arteira-app/
├── public/imagens/           # imagens do site
└── src/
    ├── main.jsx              # entrada + rotas + provider
    ├── App.jsx               # layout (Header + Nav + conteúdo)
    ├── index.css             # estilos (portados do protótipo)
    ├── components/
    │   ├── Header.jsx
    │   ├── Nav.jsx
    │   ├── PostCard.jsx      # card de uma postagem (ações só do dono)
    │   ├── PostFormModal.jsx # formulário criar/editar + upload de foto
    │   ├── ConfirmDialog.jsx # confirmação de exclusão
    │   └── LoginModal.jsx    # login do usuário
    ├── context/
    │   ├── PostsContext.jsx  # estado + CRUD + localStorage
    │   └── UserContext.jsx   # usuário logado + localStorage
    ├── data/
    │   └── postsIniciais.js  # dados iniciais (seed)
    ├── utils/
    │   └── imagem.js         # upload/redimensionamento de imagem
    └── pages/
        ├── Home.jsx
        └── Comunidade.jsx    # feed + orquestração do CRUD
```

## Como executar

Pré-requisitos: **Node.js 18+** e **npm**.

```bash
cd arteira-app
npm install
npm run dev
```

Abra o endereço mostrado no terminal (por padrão `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```
