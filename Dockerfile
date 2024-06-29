FROM node:20.9.0

WORKDIR /usr/src/apps

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
