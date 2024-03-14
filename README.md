 <h2>Descrição do Aplicativo</h2>

Aplicativo de Sistema de uma empresa de limpeza (Cleaning Company) para gerenciamento de clientes, e calculo de rotas.
Composto backend ( Node.js ), banco de dados ( PostgreSQL) e frontend ( React ).

Pedido 1:
A empresa utiliza as seguintes informações para gerenciar seus clientes: nome, email e telefone. ( adicionado cep para calculos de rota )

Na plataforma criada deve ser possível:
Listar os seus clientes e filtrar com base nas informações cadastradas
Cadastrar clientes novos

Pedido 2:
Calcular a rota partindo da empresa  e que passe pela localização de todos os clientes cadastrados no banco de dados e retorne à empresa no final. A rota deve ser calculada para ter a menor distância possível.

O algoritmo para calcular essa rota deve estar disponibilizado via rota da api para ser chamado pelo front quando necessário.
______________________________________________________________________________

<h2>Docker do Projeto</H2>

Nome da Imagem e Versão
Backend: Imagem sendo construída a partir do Dockerfile no diretório ./backend.
Frontend: Imagem sendo construída a partir do Dockerfile no diretório ./frontend.
Banco de Dados (PostgreSQL): Imagem oficial postgres:latest.
Descrição
Este arquivo docker-compose.yml define os serviços necessários para executar o projeto, composto por três serviços:

db (Banco de Dados): PostgreSQL, utilizando a imagem oficial postgres:latest. Configurado para reiniciar sempre e expor a porta 5433.
backend: Serviço de backend construído a partir do Dockerfile no diretório ./backend. Configurado para reiniciar em caso de falha e expor a porta 3001. Dependente do serviço do banco de dados.
frontend: Serviço de frontend construído a partir do Dockerfile no diretório ./frontend. Configurado para reiniciar sempre e expor a porta 3000. Dependente do serviço de backend.
Os serviços são organizados em uma rede interna pelo Docker Compose, permitindo a comunicação entre eles.
Execute o seguinte comando para iniciar os contêineres do aplicativo:

docker-compose up --build -d
        ou
docker-compose build && docker-compose up        


_____________________________________________________________________________________

<h2>Docker Compose</h2>


O Docker Compose é uma ferramenta para definir e executar aplicativos Docker de vários contêineres. Ele permite que você defina toda a pilha de serviços do seu aplicativo em um único arquivo de configuração YAML, simplificando o processo de execução e gerenciamento do aplicativo em diferentes ambientes.

Instalação do Docker Compose
Se você ainda não tem o Docker Compose instalado, você pode seguir as instruções oficiais de instalação aqui.

###Utilizando o Docker Compose

Este projeto inclui um arquivo docker-compose.yml que define os serviços necessários para executar o aplicativo. Para iniciar o aplicativo usando o Docker Compose, siga estas etapas:

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

Navegue até o diretório raiz do projeto onde está localizado o arquivo docker-compose.yml.

Execute o seguinte comando para iniciar os contêineres do aplicativo:

bash
Copy code
___________________________________________________________________

docker-compose up --build -d
        ou
docker-compose build && docker-compose up 
___________________________________________________________________
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
___________________________________________________________________

<h2> Banco de Dados </h2>

Pedido 1:
Junto com o código fonte forneça o DDL da tabela do banco de dados. Dê preferência para consultas em SQL na api e evite a utilização de ORMs.
___________________________________________________________________
-- DDL para criar a tabela de clientes
___________________________________________________________________
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT NOT NULL,
    cep TEXT NOT NULL
);
___________________________________________________________________

-- DML (Data Manipulation Language) uso
___________________________________________________________________
Inserir Dados
INSERT INTO clientes (nome, email, telefone, cep) VALUES ($1, $2, $3, $4) RETURNING *'
___________________________________________________________________
Buscar todos dados
SELECT * FROM clientes
___________________________________________________________________
Buscar por ID
SELECT * FROM clientes WHERE id = $1`
___________________________________________________________________
Atualizar 
UPDATE clientes SET nome = $1, email = $2, telefone = $3, cep = $4 WHERE id = $5 RETURNING *`
___________________________________________________________________
Deletar
DELETE FROM clientes WHERE id = $1
___________________________________________________________________



<h2> Rotas da api backend </h2>
_____________________________________________________________________

Criar cliente
POST http://localhost:3001/api/savedate
Content-Type: application/json
{ "nome": "John Doe","email": "john.doe@example.com.dxyjhjsg", "telefone":"123456789", "cep": "12345-678"}

______________________________________________________________________

Obter (GET) todos os dados
GET http://localhost:3001/api/checkdata
_____________________________________________________________________

Obter por ID
GET http://localhost:3001/api/checkdata/ID
_____________________________________________________________________

Update 
PUT http://localhost:3001/api/updatedata/15
Content-Type: application/json
{ "nome": "Updated Name", "email": "updated.email@example.com", "telefone":"987654321", "cep": "12345-678"}
_____________________________________________________________________
Delete cliente
DELETE http://localhost:3001/api/deletedata/ID
_____________________________________________________________________

Rota para calculo de Distancia configurando o inicio

POST http://localhost:3001/api/calculate-route HTTP/1.1
Content-Type: application/json
{"company": {"name": "Cleaning","cep": "08141-300"},"client1": {"name": "Cliente 1",
 "cep": "08141-330"},"client2": {"name": "Cliente 2","cep": "59920-000"}}
 _____________________________________________________________________

Rota calculo de distancia com diversos destinos 
POST http://localhost:3001/api/calculate-route-all
Content-Type: application/json

_______________________________________________________________________
<h2>Calculo de rotas</h2>

Foi necessario para os calculos de distancia ter Longitude e Latidude de cada Cep . utilizei a biblioteca do node ( node-geocoder ), 
tendo as coordenadas , assim usei a fórmula euclidiana de maneira mais simplificada possivel : 
__________________________________________________________
d = √((x2 - x1)^2 + (y2 - y1)^2)

function calDistance(point1, point2) {
    const deltaX = point2.longitude - point1.longitude;
    const deltaY = point2.latitude - point1.latitude;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
__________________________________________________________

e depois utilizeis calRouteExcellent() para calcular a distancia..

<h2>AJUSTES</h2>

Depois de uma analise mesmo fora do prazo percebi que a formula euclidiana so calcula distancias retas e não seria ideal,
ajustei coloque a formula de haversine resolvi corrigir e deixar comentada a parte euclidiana no codigo
d=R⋅c 
c=2⋅atan2( a, −a )
a=sin 2 (2Δφ​ )+cos(φ 1 )⋅cos(φ 2 )⋅sin 2 (2Δλ )

    const toRadians = (value) => (value * Math.PI) / 180;
    const R = 6371000; 

    const A1 = toRadians(point1.latitude);
    const A2 = toRadians(point2.latitude);
    const B1 = toRadians(point2.latitude - point1.latitude);
    const B2 = toRadians(point2.longitude - point1.longitude);

    const a = Math.sin(B1 / 2) * Math.sin(B1 / 2) +
              Math.cos(A1) * Math.cos(A2) * Math.sin(B2 / 2) * Math.sin(B2 / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));


A correção foi pelo calculo errado da distencia em Kilometros não pela ordem da lista que foi o que foi proposto no teste. 
__________________________________________________________
<h2> Front End </H2>

Cadastro
![image](https://github.com/erascardsilva/Cleaning-Company-Test-Facilita/assets/70297459/e6a1daf2-7a7b-47bb-bb11-207b3b44d5a5)
_______________________________________________________________________
Verifica tabela
![image](https://github.com/erascardsilva/Cleaning-Company-Test-Facilita/assets/70297459/649a87d2-3059-4c35-ab83-3e044ededee4)
_______________________________________________________________________
Edita dados
![image](https://github.com/erascardsilva/Cleaning-Company-Test-Facilita/assets/70297459/aa59945d-e988-4009-aee1-60ebcef87ad6)
_______________________________________________________________________
Calcula Rotas 
![image](https://github.com/erascardsilva/Cleaning-Company-Test-Facilita/assets/70297459/cf101787-623c-40c1-bd70-9fcad4b740bf)
_______________________________________________________________________
Faz a Rota livre
![image](https://github.com/erascardsilva/Cleaning-Company-Test-Facilita/assets/70297459/4df7f755-1cce-4b22-9b62-c9a74ed66b45)





