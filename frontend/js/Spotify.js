// ============================================
// Login - Spotify Fake
// Autor: Matheus Dziubate
// ============================================

// Endereço do servidor
var SERVIDOR = 'http://localhost:3000';

// Faz o login chamando o servidor via fetch (ROTA 1)
function funclogar() {
    var nome  = document.getElementById('InputNome').value.trim();
    var senha = document.getElementById('InputSenha').value.trim();
    var saida = document.getElementById('saida');

    if (nome === '' || senha === '') {
        saida.textContent = 'Preencha todos os campos!';
        return;
    }

    // Chamada 1: POST /login
    fetch(SERVIDOR + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome, senha: senha })
    })
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(dados) {
        if (dados.sucesso) {
            // Salva o id do usuário para usar na página de músicas
            localStorage.setItem('usuario_id',   dados.usuario.id);
            localStorage.setItem('usuario_nome', dados.usuario.nome);
            window.location.href = 'Musicas.html';
        } else {
            saida.textContent = dados.mensagem;
        }
    })
    .catch(function(erro) {
        saida.textContent = 'Erro ao conectar no servidor. Verifique se ele está rodando.';
        console.error(erro);
    });
}

// Mostra/esconde a senha
function MostrarSenha() {
    var senhaInput = document.getElementById('InputSenha');
    var botao      = document.getElementById('BotaoVizualizar');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        botao.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        senhaInput.type = 'password';
        botao.classList.replace('bi-eye-slash', 'bi-eye');
    }
}
