// ============================================
// Cadastro - Spotify Fake
// Autor: Matheus Dziubate
// ============================================

var SERVIDOR = 'http://localhost:3000';

// Faz o cadastro verificando o servidor (ROTA 4)
function funccadastro() {
    var nome            = document.getElementById('InputNome').value.trim();
    var senha           = document.getElementById('InputSenha').value.trim();
    var confirmarSenha  = document.getElementById('InputConfirmarSenha').value.trim();
    var saida           = document.getElementById('saida');

    if (nome === '' || senha === '' || confirmarSenha === '') {
        saida.textContent = 'Preencha todos os campos!';
        return;
    }
    if (senha !== confirmarSenha) {
        saida.textContent = 'As senhas não coincidem!';
        return;
    }
    if (senha.length < 6) {
        saida.textContent = 'A senha deve ter pelo menos 6 caracteres!';
        return;
    }

    // Chamada 2: GET /verificar/:nome — checa se o nome já existe no banco
    fetch(SERVIDOR + '/verificar/' + nome)
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(dados) {
        if (dados.existe) {
            saida.textContent = 'Nome de usuário já existe! Escolha outro.';
        } else {
            // Nome disponível — cadastro aprovado (avisa e redireciona)
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'Spotify.html';
        }
    })
    .catch(function(erro) {
        saida.textContent = 'Erro ao conectar no servidor.';
        console.error(erro);
    });
}

// Mostra/esconde a senha
function MostrarSenha() {
    var senhaInput    = document.getElementById('InputSenha');
    var confirmaInput = document.getElementById('InputConfirmarSenha');
    var botao         = document.getElementById('BotaoVizualizar');

    if (senhaInput.type === 'password') {
        senhaInput.type    = 'text';
        confirmaInput.type = 'text';
        botao.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        senhaInput.type    = 'password';
        confirmaInput.type = 'password';
        botao.classList.replace('bi-eye-slash', 'bi-eye');
    }
}
