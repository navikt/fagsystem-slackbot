FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

ENV NODE_ENV=production
WORKDIR /app

COPY src ./src

EXPOSE 8080
CMD ["./src/app.js"]