# Spotify Fake 🎵

Projeto desenvolvido por **Matheus Dziubate** para a disciplina de Desenvolvimento Web 1 — 2º Bimestre 2026.

---

## 📋 Sobre o Projeto

Simulação de um player de música inspirado no Spotify. Possui telas de **login**, **cadastro** e **player de músicas**, com back-end em Node.js e banco de dados PostgreSQL.

O usuário faz login com nome e senha, e é redirecionado para a tela do player, onde pode escolher uma música pelo dropdown e ouvi-la. As músicas ficam em loop automático.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3, JavaScript (fetch API)
- **Back-end:** Node.js + Express
- **Banco de Dados:** PostgreSQL (via PgAdmin 4)
- **Bibliotecas:** pg, cors, dotenv
- **Ícones:** Bootstrap Icons

---

## 📁 Estrutura do Projeto

    MatheusDziubate_2bim_SpotifyFake/
    ├── frontend/
    │   ├── Spotify.html       # Tela de login
    │   ├── Cadastro.html      # Tela de cadastro
    │   ├── Musicas.html       # Player de músicas
    │   ├── css/
    │   │   ├── Spotify.css    # Estilo do login e cadastro
    │   │   └── Musicas.css    # Estilo do player
    │   ├── js/
    │   │   ├── Spotify.js     # Lógica do login
    │   │   ├── Cadastro.js    # Lógica do cadastro
    │   │   └── Musicas.js     # Lógica do player
    │   ├── jpeg/              # Imagens (logo e capas das músicas)
    │   └── mp3/               # Arquivos de música
    ├── backend/
    │   ├── server.js          # Servidor Node.js
    │   ├── .env               # Variáveis de ambiente (não vai ao GitHub)
    │   └── package.json
    ├── database/
    │   └── spotifyfake.sql    # DDL + dados para popular o banco
    ├── .gitignore
    └── README.md

---

## 🚀 Como Rodar o Projeto

### 1. Banco de Dados

1. Abra o **PgAdmin 4**
2. Crie um banco chamado `spotifyfake`
3. Abra o **Query Tool** dentro do banco
4. Execute o arquivo `database/spotifyfake.sql`
5. Isso vai criar as tabelas e popular com os dados

### 2. Back-End (Servidor)

1. Entre na pasta `backend/`
2. Crie um arquivo `.env` com o seguinte conteúdo:

        DB_HOST=localhost
        DB_USER=postgres
        DB_PASSWORD=sua_senha_aqui
        DB_NAME=spotifyfake
        DB_PORT=5432
        PORT=3000

3. Instale as dependências e rode o servidor:

        cd backend
        npm install
        node server.js

O servidor vai rodar em: `http://localhost:3000`

### 3. Front-End

Abra o arquivo `frontend/Spotify.html` com a extensão **Live Server** do VS Code.

> ⚠️ É obrigatório usar o Live Server — abrir o HTML direto pelo navegador não funciona.

---

## 🔗 Rotas do Servidor

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/login` | Verifica usuário e senha no banco |
| GET | `/musicas` | Retorna todas as músicas |
| GET | `/verificar/:nome` | Verifica se um nome já está cadastrado |
| GET | `/favoritos/:usuario_id` | Retorna as músicas favoritas de um usuário |

---

## 👤 Usuários de Teste

| Usuário | Senha |
|---------|-------|
| admin | 1234 |
| joao | senha123 |

---

## ⚠️ Observação sobre o Cadastro

A tela de cadastro está funcional em termos de validação (verifica se o nome já existe no banco via rota `/verificar/:nome`), porém **novos usuários não são persistidos no banco de dados**.

Isso é uma limitação intencional seguindo os requisitos do bimestre, que permitem **apenas consultas SELECT**. A funcionalidade de INSERT para salvar novos cadastros será implementada no próximo bimestre.

Para testar o sistema, utilize os usuários já cadastrados no banco:

| Usuário | Senha |
|---------|-------|
| admin | 1234 |
| joao | senha123 |
| maria | senha456 |

## 📊 Banco de Dados

- **Tabela `usuarios`**: armazena os usuários do sistema
- **Tabela `musicas`**: armazena as músicas disponíveis no player
- **Tabela `favoritos`**: relaciona usuários com músicas (chave estrangeira para ambas as tabelas)

---

## 🔄 Fluxo de Dados

    Usuário → preenche login → fetch POST /login → servidor consulta banco → retorna JSON → JS redireciona para Musicas.html
    Musicas.html → fetch GET /musicas → servidor consulta banco → retorna JSON → JS preenche o dropdown
    Usuário → seleciona música → JS usa o caminho do banco → navegador toca o arquivo

---

© 2026 - Matheus Dziubate 🔥