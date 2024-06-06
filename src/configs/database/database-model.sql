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

ALTER TABLE post MODIFY descricao VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


INSERT INTO usuario VALUE
    (DEFAULT, 'jeancharlesx64', 'jean.albuquerque@sptech.school', 'jean123', '#9PPYCYC28','1717551406929_jean-profile.jfif', NOW()),
	(DEFAULT, 'ashi007', 'ashi.gupta@outlook.com', 'ashi123', '#RYQPCJGYY','1717552089584_ashi-profile.jfif', NOW()),
    (DEFAULT, 'dechamps', 'samuel.tsouza@sptech.school', 'samuel123', '#99LLGL9VJ','1717640238349_imagem_2024-06-05_231717437.png', NOW());
    
INSERT INTO estatistica VALUE
	(DEFAULT, NULL, NULL, NULL, NULL, 1),
    (DEFAULT, NULL, NULL, NULL, NULL, 2);

INSERT INTO post VALUE
	(DEFAULT, 'Vocês conseguiram jogar neste desafio??', '1717436041633_ss-teste.jfif', '2024-06-03 14:34:01', 1),
    (DEFAULT, 'Olhem esse deck que eu criei!! 😊', '1717634182771_ashi-deck.jfif', '2024-06-05 21:36:23', 2),
    (DEFAULT, 'Me expulsaram do clã 😡😡😡', '1717638577476_jean-clan.jfif', '2024-06-05 22:49:37', 1),
    (DEFAULT, 'Sequência de vitórias 😎 samuel joga demais hehe', '1717639495730_jean-victory.jfif', '2024-06-05 23:04:56', 1);
    
SELECT * FROM usuario;
SELECT * FROM estatistica;
SELECT * FROM post;


