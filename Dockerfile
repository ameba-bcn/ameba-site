FROM node:10

COPY . /src

WORKDIR /src
COPY package*.json ./

RUN npm install
RUN npm install nodemon -g --save

CMD ["nodemon", "-L", "--exec", "npm", "start"]
