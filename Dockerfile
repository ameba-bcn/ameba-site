FROM node:10
WORKDIR /src
COPY package*.json ./

RUN npm install
RUN npm install nodemon -g --save

EXPOSE 3000

CMD ["nodemon", "-L", "--exec", "npm", "start"]