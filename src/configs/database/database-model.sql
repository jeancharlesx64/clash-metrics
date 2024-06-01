CREATE DATABASE clashmetrics;
USE clashmetrics;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(45),
    email VARCHAR(60),
    senha VARCHAR(255),
    gamertag VARCHAR(16),
    fotoPerfil VARCHAR(255),
    dataCriacao DATETIME
);

CREATE TABLE estatistica(
	idEstatistica INT AUTO_INCREMENT,
    trofeus INT,
    vitorias INT,
    derrotas INT,
    partyMode INT,
    fkUsuario INT,
		CONSTRAINT estatisticaHasPK PRIMARY KEY(idEstatistica, fkUsuario),
        CONSTRAINT estatisticaHasUsuario FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE post(
	idPost INT AUTO_INCREMENT,
    descricao VARCHAR(150),
    fotoPost VARCHAR(255),
    dataCriacao DATETIME,
    fkUsuario INT,
		CONSTRAINT postHasPk PRIMARY KEY (idPost, fkUsuario),
        CONSTRAINT postHasUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

INSERT INTO usuario VALUE
    (DEFAULT, 'jeancharlesx64', 'jean.albuquerque@sptech.school', 'jeancharles123', '#9PPYCYC28',NULL, NOW());

INSERT INTO estatistica VALUE
	(DEFAULT, NULL, NULL, NULL, NULL, 1);

SELECT * FROM usuario;
SELECT * FROM estatistica;