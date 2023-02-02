# Building image
FROM node:18-alpine as builder
WORKDIR /code

COPY . .

RUN npm install
RUN cd apps/backend && npm install
RUN npx nx run backend:build:production

# Runtime
FROM node:18-alpine as runtime
WORKDIR /code

COPY --from=builder /code/apps/backend/build .
COPY --from=builder /code/apps/backend/node_modules ./node_modules

ENTRYPOINT [ "node", "server.js" ]
EXPOSE 3000