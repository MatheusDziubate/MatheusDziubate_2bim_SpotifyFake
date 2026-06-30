// ============================================
// Servidor - Spotify Fake
// Autor: Matheus Dziubate
// ============================================

require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ---- Conexão com o banco de dados ----
const pool = new Pool({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:     process.env.DB_PORT
});

pool.connect(function(erro) {
    if (erro) {
        console.error('Erro ao conectar no banco:', erro);
        return;
    }
    console.log('Conectado ao PostgreSQL com sucesso!');
});

// ============================================
// ROTA 1 - Login
// POST /login
// ============================================
app.post('/login', function(req, res) {
    var nome  = req.body.nome;
    var senha = req.body.senha;

    var sql = 'SELECT * FROM usuarios WHERE nome = $1 AND senha = $2';
    pool.query(sql, [nome, senha], function(erro, resultado) {
        if (erro) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor' });
        }
        if (resultado.rows.length > 0) {
            res.json({ sucesso: true, mensagem: 'Login realizado!', usuario: resultado.rows[0] });
        } else {
            res.json({ sucesso: false, mensagem: 'Usuário ou senha incorretos!' });
        }
    });
});

// ============================================
// ROTA 2 - Listar todas as músicas
// GET /musicas
// ============================================
app.get('/musicas', function(req, res) {
    var sql = 'SELECT * FROM musicas';
    pool.query(sql, function(erro, resultado) {
        if (erro) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar músicas' });
        }
        res.json({ sucesso: true, musicas: resultado.rows });
    });
});

// ============================================
// ROTA 3 - Verificar se nome já existe
// GET /verificar/:nome
// ============================================
app.get('/verificar/:nome', function(req, res) {
    var nome = req.params.nome;

    var sql = 'SELECT id FROM usuarios WHERE nome = $1';
    pool.query(sql, [nome], function(erro, resultado) {
        if (erro) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro ao verificar usuário' });
        }
        res.json({ existe: resultado.rows.length > 0 });
    });
});

// ============================================
// ROTA 4 - Favoritos de um usuário
// GET /favoritos/:usuario_id
// ============================================
app.get('/favoritos/:usuario_id', function(req, res) {
    var usuario_id = req.params.usuario_id;

    var sql = `
        SELECT m.id, m.titulo, m.arquivo, m.capa
        FROM favoritos f
        JOIN musicas m ON f.musica_id = m.id
        WHERE f.usuario_id = $1
    `;
    pool.query(sql, [usuario_id], function(erro, resultado) {
        if (erro) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar favoritos' });
        }
        res.json({ sucesso: true, musicas: resultado.rows });
    });
});

// Inicia o servidor
app.listen(PORT, function() {
    console.log('Servidor rodando em http://localhost:' + PORT);
});