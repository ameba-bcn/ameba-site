FROM node:10

ARG NODE_PATH=/opt/node_modules
ENV NODE_PATH=${NODE_PATH}

COPY . /opt/src
WORKDIR /opt/src

RUN chmod +x start.sh

RUN npm install
RUN npm install nodemon -g --save

CMD ["./start.sh"]
