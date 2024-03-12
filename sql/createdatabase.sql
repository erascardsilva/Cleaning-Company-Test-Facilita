-- Database creation
CREATE DATABASE CleaningCompany;

-- Creating the customer table
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT NOT NULL,
    cep TEXT NOT NULL
);

-- Creating User
CREATE USER erasmo_dev WITH PASSWORD '3727';

-- Granting user privileges in the database
GRANT ALL PRIVILEGES ON DATABASE CleaningCompany TO erasmo_dev;
