-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS security_residential;

-- Uso do banco de dados
USE security_residential;

-- Criação das tabelas (chama o script `create-tables.sql`)
SOURCE create-tables.sql;

-- Inserção de dados iniciais (chama o script `seed-data.sql`)
SOURCE seed-data.sql;
