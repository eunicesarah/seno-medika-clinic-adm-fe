FROM node:20

WORKDIR /src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
