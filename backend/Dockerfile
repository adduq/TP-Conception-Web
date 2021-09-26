# FROM python:3.9

# RUN adduser communoservice
# USER communoservice

# # python envs
# ENV PYTHONFAULTHANDLER=1 \
#     PYTHONUNBUFFERED=1 \
#     PYTHONHASHSEED=random \
#     PIP_NO_CACHE_DIR=off \
#     PIP_DISABLE_PIP_VERSION_CHECK=on \
#     PIP_DEFAULT_TIMEOUT=100

# # python dependencies
# COPY ./requirements.txt /
# RUN pip install -r ./requirements.txt

# # upload scripts
# COPY --chown=communoservice:communoservice ./scripts/entrypoint.sh ./scripts/start.sh ./scripts/gunicorn.sh /tmp/

# # Fix windows docker bug, convert CRLF to LF
# RUN sed -i 's/\r$//g' /tmp/start.sh && chmod +x /tmp/start.sh &&\
#     sed -i 's/\r$//g' /tmp/entrypoint.sh && chmod +x /tmp/entrypoint.sh &&\
#     sed -i 's/\r$//g' /tmp/gunicorn.sh && chmod +x /tmp/gunicorn.sh

# WORKDIR /app

# ENTRYPOINT ["/tmp/entrypoint.sh"]

# Use an official Python runtime as a parent image
FROM python:3.7-alpine

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/backend

# Install Python dependencies
COPY requirements.txt /app/backend
RUN  \
    apk update && \
    apk upgrade && \
    apk add bash && \
    apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip3 install --upgrade pip -r requirements.txt && \
    apk --purge del .build-deps

# Add the rest of the code
COPY . /app/backend
COPY ./scripts/ /app/

# Make port 8000 available for the app
ENV PORT 8080
EXPOSE 8080

RUN adduser communoservice
USER communoservice

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
# RUN ["chmod", "+x", "/app/entrypoint.sh"]
# ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD gunicorn config.wsgi:application --bind 0.0.0.0:$PORT