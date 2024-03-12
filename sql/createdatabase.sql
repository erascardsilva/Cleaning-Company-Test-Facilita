-- Database creation
CREATE DATABASE Cleaning-Company;

-- Creating the customer table
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT NOT NULL,
    coordenada_x FLOAT,
    coordenada_y FLOAT
);

-- Creating User
CREATE USER erasmo_dev WITH PASSWORD '3727';

-- Granting user privileges in the database
GRANT ALL PRIVILEGES ON DATABASE Cleaning-Company TO erasmo_dev;
