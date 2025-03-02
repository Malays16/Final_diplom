FROM node:22.14
WORKDIR /app
COPY package*.json ./
# RUN npm install --legacy-peer-deps
RUN npm cache clean --force && npm install --legacy-peer-deps

COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]