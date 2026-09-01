FROM node:24-bookworm-slim AS base

WORKDIR /usr/src/app

COPY src ./src
COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml

ENV NODE_ENV="production"
RUN npm install -g pnpm
RUN pnpm install


FROM gcr.io/distroless/nodejs24-debian13 AS prod

COPY --from=base /usr/src/app /app
ENV NODE_ENV=production

WORKDIR /app
EXPOSE 8080

CMD ["./src/app.js"]