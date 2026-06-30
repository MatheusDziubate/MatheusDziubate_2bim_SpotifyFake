DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS musicas;
DROP TABLE IF EXISTS usuarios;

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
('Obsessed',            'mp3/Obsessed.mp3',           'jpeg/obsessed.jpg'),
('Baby Doll',           'mp3/BabyDoll.mp3',           'jpeg/babydoll.jpg'),
('Needy',               'mp3/Needy.mp3',              'jpeg/needy.jpg'),
('From The Start',      'mp3/FromTheStart.mp3',       'jpeg/fromthestart.jpg'),
('Drowning',            'mp3/Drowning.mp3',           'jpeg/drowning.jpg'),
('Life Goes On',        'mp3/LifeGoesOn.mp3',         'jpeg/lifegoeson.jpg'),
('Baby',                'mp3/Baby.mp3',               'jpeg/baby.jpg'),
('City Of Angels',      'mp3/CityOfAngels.mp3',       'jpeg/cityofangels.jpg'),
('Admiravel Chip Novo', 'mp3/AdmiravelChipNovo.mp3',  'jpeg/admiravelchipnovo.jpg'),
('Duality',             'mp3/Duality.mp3',            'jpeg/duality.jpg');

INSERT INTO favoritos (usuario_id, musica_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4), (2, 5),
(3, 2), (3, 3),
(4, 1), (4, 5),
(5, 3);