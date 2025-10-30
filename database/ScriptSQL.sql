create database db_sga_2025;

use db_sga_2025;

drop database db_sga_2025;

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
    
    CONSTRAINT FK_TIPO_MOVIMENTACAO_ 
        FOREIGN KEY (id_movimentacao) REFERENCES tipo_movimentacao(id), 

);

INSERT INTO tbl_usuario (login, senha)
VALUES
('admin', '12345'),
('joao.silva', 'senha123'),
('maria.souza', 'abc123'),
('pedro.lima', 'qwerty'),
('ana.costa', '123456'),
('carla.oliveira', 'senhaSegura!'),
('lucas.pereira', 'teste2025'),
('rafael.santos', 'minhasenha'),
('bruna.mendes', 'pass1234'),
('juliana.ferreira', 'segredo!');


select * from tbl_usuario where login = '' and senha = '';
select * from tbl_livro where titulo like "%19%";