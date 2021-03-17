FROM node:12-alpine

WORKDIR /app

COPY ./server/ ./

RUN npm install --package-lock-only

CMD ["node", "index.js"]
