# FROM node:9-slim
FROM mhart/alpine-node:12.21.0
WORKDIR /client
COPY package*.json /client
RUN npm install
COPY . /client
EXPOSE 3000
CMD ["npm","start"]