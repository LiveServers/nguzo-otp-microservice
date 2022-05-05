FROM node:16-alpine as deps

WORKDIR /usr/src/app

COPY ./package.json ./

COPY . .

RUN yarn install --only=deps
RUN yarn add global @nestjs/cli
RUN yarn run build

# rebuild the source code oly when needed
FROM node:16-alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/.env ./.env
COPY --from=deps /usr/src/app/package.json ./package.json
COPY --from=deps /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/yarn.lock ./yarn.lock
COPY --from=deps /usr/src/app/rabbitmq.env ./rabbitmq.env
COPY --from=deps /usr/src/app/tsconfig.build.json ./tsconfig.build.json
COPY --from=deps /usr/src/app/tsconfig.json ./tsconfig.json

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
EXPOSE 4501
# EXPOSE 5672
CMD /wait && ["yarn","start:prod"]