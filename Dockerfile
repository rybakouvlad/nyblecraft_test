FROM node:14.17-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm install 
RUN npm build

COPY . .

ENV PORT=4000

CMD  npm run start:dev