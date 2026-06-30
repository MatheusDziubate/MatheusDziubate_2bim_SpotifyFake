-- ============================================
-- Spotify Fake - Banco de Dados (PostgreSQL)
-- Autor: Matheus Dziubate
-- ============================================	
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS musicas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    arquivo VARCHAR(200) NOT NULL,
    capa VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id),
    musica_id INT NOT NULL REFERENCES musicas(id)
);

DELETE FROM favoritos;
DELETE FROM musicas;
DELETE FROM usuarios;

ALTER SEQUENCE usuarios_id_seq RESTART WITH 1;
ALTER SEQUENCE musicas_id_seq RESTART WITH 1;
ALTER SEQUENCE favoritos_id_seq RESTART WITH 1;

INSERT INTO usuarios (nome, senha) VALUES
('admin',    '1234'),
('joao',     'senha123'),
('maria',    'senha456'),
('pedro',    'pedropass'),
('ana',      'anapass'),
('lucas',    'lucas123'),
('julia',    'julia456'),
('carlos',   'carlos99'),
('beatriz',  'bea2026'),
('rafael',   'rafa123'),
('camila',   'cami456');

INSERT INTO musicas (titulo, arquivo, capa) VALUES
('Obsessed',            'frontend/mp3/Obsessed.mp3',           'frontend/jpeg/obsessed.jpg'),
('Baby Doll',           'frontend/mp3/BabyDoll.mp3',           'frontend/jpeg/babydoll.jpg'),
('Needy',               'frontend/mp3/Needy.mp3',              'frontend/jpeg/needy.jpg'),
('From The Start',      'frontend/mp3/FromTheStart.mp3',       'frontend/jpeg/fromthestart.jpg'),
('Drowning',            'frontend/mp3/Drowning.mp3',           'frontend/jpeg/drowning.jpg'),
('Life Goes On',        'frontend/mp3/LifeGoesOn.mp3',         'frontend/jpeg/lifegoeson.jpg'),
('Baby',                'frontend/mp3/Baby.mp3',               'frontend/jpeg/baby.jpg'),
('City Of Angels',      'frontend/mp3/CityOfAngels.mp3',       'frontend/jpeg/cityofangels.jpg'),
('Admiravel Chip Novo', 'frontend/mp3/AdmiravelChipNovo.mp3',  'frontend/jpeg/admiravelchipnovo.jpg'),
('Duality',             'frontend/mp3/Duality.mp3',            'frontend/jpeg/duality.jpg');


INSERT INTO favoritos (usuario_id, musica_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4), (2, 5),
(3, 2), (3, 3),
(4, 1), (4, 5),
(5, 3);

UPDATE musicas SET 
    arquivo = REPLACE(arquivo, 'frontend/', ''),
    capa = REPLACE(capa, 'frontend/', '');
    
SELECT * FROM favoritos;
