FROM node:lts-alpine as builder

WORKDIR /app
ADD ./package.json ./package.json
ADD ./yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn install --frozen-lockfile --production

FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/dist ./dist

EXPOSE 8080

CMD node ./dist/src/main.js
