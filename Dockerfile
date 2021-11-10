FROM node:14

WORKDIR /piggy-bank-server

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]