create database saep_db;

USE saep_db;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    unidade_medida VARCHAR(10) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    estoque_minimo INT NOT NULL,
    data_validade DATE NULL
);

CREATE TABLE movimentacao (
    id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao DATETIME NOT NULL,
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto) REFERENCES produto(id_produto) ON DELETE CASCADE,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO usuario (nome, login, senha) VALUES
('Carlos Junior', 'carlos', 'carlossenha'),
('Ana Clara', 'ana', 'anasenha'),
('Marcos Henrique', 'marcos', 'marcossenha');

INSERT INTO produto (nome, categoria, unidade_medida, quantidade_estoque, estoque_minimo, data_validade) VALUES
('Cimento', 'Estrutura', 'kg', 45, 15, '2026-12-31'),
('Tinta Acrílica', 'Acabamento', 'un', 8, 10, '2027-06-15'),
('Argamassa', 'Acabamento', 'kg', 30, 10, '2026-11-20');

INSERT INTO movimentacao (id_produto, id_usuario, tipo, quantidade, data_movimentacao) VALUES
(1, 1, 'entrada', 50, '2026-09-01 08:30:00'),
(2, 1, 'entrada', 15, '2026-09-02 09:15:00'),
(2, 3, 'saida', 7, '2026-09-05 14:20:00');