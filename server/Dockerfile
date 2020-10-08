FROM node:lts-alpine
WORKDIR /app
COPY server/package.json ./
RUN npm install --production
COPY server ./
EXPOSE 8080
RUN ls -la /app
CMD ["npm", "run", "prod-dock"]
