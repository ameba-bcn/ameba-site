FROM node:10
WORKDIR /src
COPY package*.json ./

RUN npm install
RUN npm install nodemon -g --save


ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST $REACT_APP_API_HOST

#EXPOSE 3000

CMD ["nodemon", "-L", "--exec", "npm", "start"]