FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY ./ /usr/src/app

RUN true \
    && apk add --no-cache python3 make g++ \
    && npm install

FROM node:alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 21 21000-21010
CMD ["npm", "start"]
