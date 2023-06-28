FROM node:18-alpine
WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev --name init
RUN npm run build

CMD [ "node", "dist/main.js" ]