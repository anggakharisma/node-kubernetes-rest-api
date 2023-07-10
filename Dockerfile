FROM node:18-alpine
WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev
RUN npm run build

CMD [ "node", "dist/main.js" ]