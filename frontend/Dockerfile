# Stage 1 - build frontend app
FROM node:10-alpine as build-deps

RUN adduser --disabled-password communoservice
# USER communoservice

WORKDIR /app/

# COPY frontend/package.json frontend/package-lock.json /app/
COPY ./package.json /app/
RUN npm install

COPY . /app/
# COPY .env /app/.env
RUN npm run build

# Stage 2 - nginx & frontend dist
FROM nginx:alpine

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs npm

USER communoservice

COPY ./dev.conf /etc/nginx/nginx.conf
COPY --from=build-deps /app/dist/ /dist/

CMD ["nginx", "-g", "daemon off;"]
