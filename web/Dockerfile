FROM node:18.12.1-alpine

WORKDIR /usr/app/web

COPY . .

RUN npm install

EXPOSE 80

CMD ["npm", "run", "dev"]
