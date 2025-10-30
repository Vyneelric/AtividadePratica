create database db_sga_2025;

use db_sga_2025;

create table tbl_usuario(
	id 				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	login 			VARCHAR(45) NOT NULL,
	senha 			VARCHAR(45) NOT NULL
);

create table tipo_movimentacao(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45) NOT NULL
);

create table tbl_livro(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    data_publicacao DATE NOT NULL,
    quantidade INT NOT NULL,
    isbn VARCHAR (45) NOT NULL
);

create table tbl_movimentacao(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_movimentacao INT NOT NULL,
    id_usuario INT NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao INT NOT NULL,
    id_livro INT NOT NULL
);