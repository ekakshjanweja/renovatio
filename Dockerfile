FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.8.1

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
