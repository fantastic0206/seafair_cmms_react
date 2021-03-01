FROM mhart/alpine-node:11 AS builder
WORKDIR /app

COPY package.json /app
COPY lerna.json /app
COPY babel.config.js /app

COPY packages/isomorphic-cra /app/packages/isomorphic
COPY shared/package.json /app/shared/package.json
COPY shared/isomorphic /app/shared/isomorphic
COPY shared/Library /app/shared/Library

RUN yarn && cd packages/isomorphic && yarn build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/packages/isomorphic/build .
CMD ["serve", "-p", "80", "-s", "."]