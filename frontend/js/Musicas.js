// ============================================
// Músicas - Spotify Fake
// Autor: Matheus Dziubate
// ============================================

var SERVIDOR    = 'http://localhost:3000';
var playlist    = [];
var audio       = document.getElementById('player');
var capa        = document.getElementById('capa');
var tituloAtual = document.getElementById('tituloAtual');

window.onload = function() {
    var usuario_nome = localStorage.getItem('usuario_nome');

    if (!usuario_nome) {
        window.location.href = 'Spotify.html';
        return;
    }

    document.getElementById('nomeUsuario').textContent = 'Olá, ' + usuario_nome + '!';

    // Chamada 3: GET /musicas
    fetch(SERVIDOR + '/musicas')
    .then(function(resposta) { return resposta.json(); })
    .then(function(dados) {
        if (dados.sucesso && dados.musicas.length > 0) {
            playlist = dados.musicas;
            preencherDropdown();
        } else {
            document.getElementById('saida').textContent = 'Nenhuma música encontrada.';
        }
    })
    .catch(function(erro) {
        document.getElementById('saida').textContent = 'Erro ao buscar músicas.';
        console.error(erro);
    });
};

function preencherDropdown() {
    var select = document.getElementById('selectMusica');
    playlist.forEach(function(musica, index) {
        var option = document.createElement('option');
        option.value = index;
        option.textContent = musica.titulo;
        select.appendChild(option);
    });
}

function selecionarMusica() {
    var select = document.getElementById('selectMusica');
    var index  = select.value;
    if (index === '') return;

    var musica = playlist[index];
    audio.src  = musica.arquivo;
    audio.play();
    capa.src   = musica.capa;
    capa.alt   = musica.titulo;
    tituloAtual.textContent = '▶ ' + musica.titulo;
}

// Loop automático
audio.onended = function() {
    var select  = document.getElementById('selectMusica');
    var proximo = (parseInt(select.value) + 1) % playlist.length;
    select.value = proximo;
    selecionarMusica();
};

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('usuario_nome');
        localStorage.removeItem('usuario_id');
        window.location.href = 'Spotify.html';
    }
}