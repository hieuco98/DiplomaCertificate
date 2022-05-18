FROM node:16-alpine
ENV NODE_ENV=production
RUN apk add nano
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]