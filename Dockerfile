FROM node:16-alpine

RUN apk add --no-cache tzdata

ENV TZ Asia/Tehran

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn run build && yarn install --production

EXPOSE 50000

CMD ["node", "dist/main.js"]
