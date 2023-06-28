FROM node:18-alpine as build-env
COPY . /app
WORKDIR /app

RUN npm i
RUN npm i typescript
RUN npm run build

FROM gcr.io/distroless/nodejs18-debian11
COPY --from=build-env /app /app
WORKDIR /app
EXPOSE 5003
CMD ["./build/index.js"]

