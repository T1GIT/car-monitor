FROM node:alpine as build-stage

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./ .
RUN yarn build


FROM caddy:alpine as serve-stage

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build-stage /app/dist /app

