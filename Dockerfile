FROM node:17-alpine

WORKDIR .

COPY . .

RUN npm install

EXPOSE 8000

CMD ["node", "./bin/www"]