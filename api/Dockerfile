FROM node:18.12.1-alpine

WORKDIR /usr/app/api

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
