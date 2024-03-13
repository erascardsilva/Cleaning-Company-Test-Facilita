FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm start & echo 'Acesse http://localhost:3000 no seu navegador' && wait"]

