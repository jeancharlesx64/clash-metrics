CREATE DATABASE clashmetrics;
USE clashmetrics;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(45),
    email VARCHAR(60),
    senha VARCHAR(255),
    gamertag VARCHAR(16),
    dataCriacao DATETIME
);

SELECT * FROM usuario;