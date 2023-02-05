# Building image
FROM node:18 as builder
WORKDIR /code

COPY . .

RUN npm install
RUN cd apps/backend && npm install
RUN npx nx run backend:build:production

# Runtime
FROM node:18 as runtime
WORKDIR /code

COPY --from=builder /code/apps/backend/build .
COPY --from=builder /code/apps/backend/node_modules ./node_modules

# Copying compiled packages/types
COPY --from=builder /code/packages/types/src ./packages/types/src
COPY --from=builder /code/packages/types/src /packages/types/src

ENTRYPOINT [ "node", "server.js" ]
EXPOSE 3000