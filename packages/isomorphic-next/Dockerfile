FROM mhart/alpine-node:11 AS builder
WORKDIR /app

COPY package.json /app
COPY lerna.json /app
COPY yarn.lock /app
COPY babel.config.js /app

COPY packages/isomorphic-next /app/packages/isomorphic-next
COPY shared/package.json /app/shared/package.json
COPY shared/isomorphic /app/shared/isomorphic
COPY shared/Library /app/shared/Library

RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev
RUN yarn && cd packages/isomorphic-next && yarn build

CMD [ "yarn", "start" ]

