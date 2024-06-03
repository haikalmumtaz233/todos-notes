FROM node:18-alpine
FROM nginx:alpin

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /usr/share/nginx/html