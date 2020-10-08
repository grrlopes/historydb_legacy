FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . ./
EXPOSE 8080
RUN ls -la /app
CMD ["npm", "run", "prod-dock"]
