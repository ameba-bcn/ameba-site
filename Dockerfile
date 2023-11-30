FROM node:10

COPY package.json /opt/src/package.json
WORKDIR /opt/src

RUN npm install
RUN npm install nodemon -g --save

COPY . /opt/src
RUN npm run build

RUN npm install http-server -g

WORKDIR /opt/src/build

CMD ["http-server", "-p", "3000", "-a", "0.0.0.0"]
