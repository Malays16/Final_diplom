FROM node:20.7.0

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=development
CMD ["npm", "run", "start:dev"]