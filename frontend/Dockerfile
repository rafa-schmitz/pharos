FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock /app/

RUN yarn install --pure-lockfile

ENV REACT_APP_BASE_URL=http://localhost:8080
ENV REACT_APP_EXPIRATION=60

COPY . /app/

RUN yarn build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/build /app/build

RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "build"]