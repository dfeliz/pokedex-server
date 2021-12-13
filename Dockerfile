FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm i -g sequelize-cli

EXPOSE 8080
CMD [ "bash", "./startup.sh" ]
