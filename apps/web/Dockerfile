FROM node:18-alpine as builder
WORKDIR /code

COPY . .
RUN npm install
RUN npx nx run web:build

# Runtime
FROM node:18-alpine as runtime
WORKDIR /app

COPY --from=builder /code/node_modules ./node_modules
COPY --from=builder /code/apps/web/build .
COPY --from=builder /code/apps/web/package.json .

ENTRYPOINT [ "node", "index.js" ]
EXPOSE 3000