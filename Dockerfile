FROM node:10-alpine
WORKDIR /usr/local/src/packagingservice
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9005
CMD [ "node", "app.js" ]
