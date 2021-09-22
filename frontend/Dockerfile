# Stage 1 - build frontend app
FROM node:10-alpine as build-deps

WORKDIR /app/

# COPY frontend/package.json frontend/package-lock.json /app/
COPY package.json package-lock.json /app/
RUN npm install

COPY public src /app/
# COPY .env /app/.env
RUN npm run build

# Stage 2 - nginx & frontend dist
FROM nginx:alpine

RUN apk update && apk upgrade && apk add nodejs npm

RUN adduser --disabled-password communoservice
USER communoservice

# RUN apk update && apk upgrade && apk add nodejs npm

COPY ./dev.conf /etc/nginx/nginx.conf
COPY --from=build-deps /app/dist/ /dist/
COPY --from=build-deps /app/ /app/

CMD ["nginx", "-g", "daemon off;"]
