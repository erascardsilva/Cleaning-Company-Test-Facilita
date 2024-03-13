FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV ESLINT_NO_DEV_ERRORS=true

CMD ["sh", "-c", "npm start & echo 'Acesse http://localhost:3000 no seu navegador' && wait"]
