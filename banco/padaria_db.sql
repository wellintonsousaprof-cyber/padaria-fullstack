DROP DATABASE IF EXISTS padaria_db;

CREATE DATABASE padaria_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE padaria_db;

-- ======================================
-- TABELA USUÁRIOS
-- ======================================

CREATE TABLE usuarios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    telefone VARCHAR(20) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    senha VARCHAR(255) NOT NULL,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ======================================
-- TABELA CATEGORIAS
-- ======================================

CREATE TABLE categorias (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(50) NOT NULL

);

-- ======================================
-- TABELA PRODUTOS
-- ======================================

CREATE TABLE produtos (

    id INT AUTO_INCREMENT PRIMARY KEY,

    categoria_id INT NOT NULL,

    nome VARCHAR(100) NOT NULL,

    descricao TEXT,

    preco DECIMAL(10,2) NOT NULL,

    imagem_url VARCHAR(255),

    FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

);

-- ======================================
-- CATEGORIAS
-- ======================================

INSERT INTO categorias (nome) VALUES

('Padaria'),
('Bebidas'),
('Mercearia'),
('Limpeza'),
('Frios'),
('Doces');

-- ======================================
-- PRODUTOS
-- ======================================

INSERT INTO produtos
(categoria_id,nome,descricao,preco,imagem_url)
VALUES

(1,'Pão Francês',
'Pão francês fresquinho',
0.90,
'imagens/pao-frances.jpg'),

(1,'Pão de Queijo',
'Pão de queijo artesanal',
3.50,
'imagens/pao-queijo.jpg'),

(1,'Croissant',
'Croissant recheado',
8.90,
'imagens/croissant.jpg'),

(2,'Coca-Cola 2L',
'Refrigerante',
12.50,
'imagens/coca2l.jpg'),

(2,'Suco de Laranja',
'Natural 500ml',
8.00,
'imagens/suco.jpg'),

(2,'Água Mineral',
'Sem gás 500ml',
3.50,
'imagens/agua.jpg'),

(3,'Arroz 5Kg',
'Arroz Tipo 1',
29.90,
'imagens/arroz.jpg'),

(3,'Feijão Carioca',
'Pacote 1Kg',
8.90,
'imagens/feijao.jpg'),

(3,'Macarrão Espaguete',
'500g',
5.99,
'imagens/macarrao.jpg'),

(4,'Detergente',
'500ml',
2.99,
'imagens/detergente.jpg'),

(4,'Sabão em Pó',
'1Kg',
14.90,
'imagens/sabao.jpg'),

(4,'Água Sanitária',
'1 Litro',
5.99,
'imagens/sanitaria.jpg'),

(5,'Presunto',
'Fatiado',
7.90,
'imagens/presunto.jpg'),

(5,'Mussarela',
'Fatiada',
8.50,
'imagens/mussarela.jpg'),

(6,'Sonho',
'Recheado com creme',
6.50,
'imagens/sonho.jpg'),

(6,'Brigadeiro',
'Tradicional',
3.00,
'imagens/brigadeiro.jpg');