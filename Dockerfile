FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm config set registry https://registry.npmjs.org
RUN npm install 
COPY . /app
CMD node server.js
EXPOSE 3000
