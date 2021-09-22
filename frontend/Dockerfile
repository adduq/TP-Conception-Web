# Stage 1 - build frontend app
FROM node:10-alpine as build-deps

WORKDIR /app/

# COPY frontend/package.json frontend/package-lock.json /app/
COPY package.json /app/
RUN npm install

COPY . /app/
# COPY .env /app/.env
RUN npm run build

# Stage 2 - nginx & frontend dist
# FROM nginx:alpine

# # RUN apk update && apk upgrade && apk add nodejs npm

# RUN adduser --disabled-password communoservice
# USER communoservice

# # RUN apk update && apk upgrade && apk add nodejs npm

# COPY ./prod.conf /etc/nginx/nginx.conf
# COPY --from=build-deps /app/dist/ /dist/
# # COPY --from=build-deps /app/ /app/

# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine as production
WORKDIR /app/
RUN apk update && apk add --no-cache python3 && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
COPY --from=build-deps /app/dist /usr/share/nginx/html
COPY ./prod.conf /etc/nginx/conf.d/default.conf
COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY ./backend .
CMD gunicorn -b 0.0.0.0:5000 app:app --daemon && \
      sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && \
      nginx -g 'daemon off;'