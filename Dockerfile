FROM node:10

COPY . /src

WORKDIR /src

RUN npm install
RUN npm install nodemon -g --save

CMD ["nodemon", "-L", "--exec", "npm", "start"]
