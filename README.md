 <h2>Descrição do Aplicativo</h2>
Aplicativo de teste para avaliar minhas habilidades em programação.
Sistema de uma empresa de limpeza (Cleaning Company) para gerenciamento de clientes, e calculo de rotas.
Composto backend ( Node.js ), banco de dados ( PostgreSQL) e frontend ( React ).

Pedido 1:
A empresa utiliza as seguintes informações para gerenciar seus clientes: nome, email e telefone. ( adicionado cep para calculos de rota )

Na plataforma criada deve ser possível:
Listar os seus clientes e filtrar com base nas informações cadastradas
Cadastrar clientes novos

Pedido 2:
Calcular a rota partindo da empresa  e que passe pela localização de todos os clientes cadastrados no banco de dados e retorne à empresa no final. A rota deve ser calculada para ter a menor distância possível.

O algoritmo para calcular essa rota deve estar disponibilizado via rota da api para ser chamado pelo front quando necessário.

-----------------------------------------------------------------------------
<h2>Docker Compose</h2>


O Docker Compose é uma ferramenta para definir e executar aplicativos Docker de vários contêineres. Ele permite que você defina toda a pilha de serviços do seu aplicativo em um único arquivo de configuração YAML, simplificando o processo de execução e gerenciamento do aplicativo em diferentes ambientes.

Instalação do Docker Compose
Se você ainda não tem o Docker Compose instalado, você pode seguir as instruções oficiais de instalação aqui.

Utilizando o Docker Compose

Este projeto inclui um arquivo docker-compose.yml que define os serviços necessários para executar o aplicativo. Para iniciar o aplicativo usando o Docker Compose, siga estas etapas:

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

Navegue até o diretório raiz do projeto onde está localizado o arquivo docker-compose.yml.

Execute o seguinte comando para iniciar os contêineres do aplicativo:

bash
Copy code
docker-compose up -d
O argumento -d é opcional e inicia os contêineres em segundo plano.

Aguarde até que os contêineres sejam construídos e iniciados. Uma vez concluído, você poderá acessar o aplicativo em http://localhost:3000.

Comandos Úteis do Docker Compose
docker-compose up: Inicia os contêineres do aplicativo.
docker-compose down: Para e remove os contêineres do aplicativo.
docker-compose build: Reconstrói os contêineres do aplicativo.
docker-compose logs: Exibe logs dos contêineres do aplicativo.
docker-compose exec <service> <command>: Executa um comando em um serviço específico.
Observações
Certifique-se de que as portas definidas no arquivo docker-compose.yml não estão em conflito com outras aplicações em execução em sua máquina.

----------------------------------------------------------------------------------



<h2> Banco de Dados </h2>

Pedido 1:
Junto com o código fonte forneça o DDL da tabela do banco de dados. Dê preferência para consultas em SQL na api e evite a utilização de ORMs.

-- DDL para criar a tabela de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT NOT NULL,
    cep TEXT NOT NULL
);

-- DML (Data Manipulation Language) uso
----------------------------------------------------------
Inserir Dados
INSERT INTO clientes (nome, email, telefone, cep) VALUES ($1, $2, $3, $4) RETURNING *'
-----------------------------------------------------------
Buscar todos dados
SELECT * FROM clientes
-----------------------------------------------------------
Buscar por ID
SELECT * FROM clientes WHERE id = $1`
-----------------------------------------------------------
Atualizar 
UPDATE clientes SET nome = $1, email = $2, telefone = $3, cep = $4 WHERE id = $5 RETURNING *`
-----------------------------------------------------------
Deletar
DELETE FROM clientes WHERE id = $1
-----------------------------------------------------------



<h2> Rotas da api backend </h2>

Criar cliente
POST http://localhost:3001/api/savedate
Content-Type: application/json
{ "nome": "John Doe","email": "john.doe@example.com.dxyjhjsg", "telefone":"123456789", "cep": "12345-678"}
------------------------------------------------------------

Obter (GET) todos os dados
GET http://localhost:3001/api/checkdata
-----------------------------------------------------------

Obter por ID
GET http://localhost:3001/api/checkdata/ID
-----------------------------------------------------------

Update 
PUT http://localhost:3001/api/updatedata/15
Content-Type: application/json
{ "nome": "Updated Name", "email": "updated.email@example.com", "telefone":"987654321", "cep": "12345-678"}
------------------------------------------------------------
Delete cliente
DELETE http://localhost:3001/api/deletedata/ID
------------------------------------------------------------

Rota para calculo de Distancia configurando o inicio

POST http://localhost:3001/api/calculate-route HTTP/1.1
Content-Type: application/json
{"company": {"name": "Cleaning","cep": "08141-300"},"client1": {"name": "Cliente 1",
 "cep": "08141-330"},"client2": {"name": "Cliente 2","cep": "59920-000"}}
 --------------------------------------------------------------

Rota calculo de distancia com diversos destinos 
POST http://localhost:3001/api/calculate-route-all
Content-Type: application/json
---------------------------------------------------------------



