FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm config set registry http://build-artifactory.eng.vmware.com:80/artifactory/api/npm/npm
RUN npm install 
COPY . /app
CMD node server.js
EXPOSE 3000