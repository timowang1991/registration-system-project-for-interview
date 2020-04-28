FROM node:12.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm run build

RUN npm prune --production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]