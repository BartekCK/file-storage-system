FROM node:14.17-alpine3.13 AS development

ENV NODE_ENV=development
WORKDIR /usr/auth-service

COPY ./package*.json ./
COPY . .

RUN npm install
RUN npm run build

FROM node:14.17-alpine3.13 AS production

ENV NODE_ENV=production
WORKDIR /usr/auth-service

COPY ./package*.json ./
COPY --from=development /usr/auth-service/dist/ ./dist

RUN npm install --only=production
RUN apk add --update --no-cache dumb-init

CMD ["dumb-init", "node", "dist/main"]
