CREATE DATABASE clashmetrics;
USE clashmetrics;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(45),
    email VARCHAR(60),
    senha VARCHAR(255),
    gamertag VARCHAR(16),
    fotoPerfil VARCHAR(255),
    trophies INT,
    dataCriacao DATETIME
);


INSERT INTO usuario VALUES
    (DEFAULT, 'jeancharlesx64', 'jean.albuquerque@sptech.school', 'jeancharles123', '#9PPYCYC28',NULL, 1, NOW()),
	(DEFAULT, 'ashigupta', 'ashi.gupta@prabhat.school', 'ashigupta123', '#RYQPCJGYY',NULL, 1, NOW()),
    (DEFAULT, 'teodorosamuel', 'samuel.teodoro@sptech.school', 'samuel123', '#99LLGL9VJ',NULL, 1, NOW());
    
SELECT * FROM usuario;