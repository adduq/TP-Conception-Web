#!/usr/bin/env bash

# set -o errexit
# set -o pipefail
# cmd="$@"

# function postgres_ready(){
# python << END
# import sys
# import psycopg2
# import environ

# try:
#     env = environ.Env()
#     dbname = env.str('POSTGRES_DB')
#     user = env.str('POSTGRES_USER')
#     password = env.str('POSTGRES_PASSWORD')
#     conn = psycopg2.connect(dbname=dbname, user=user, password=password, host='postgres', port=5432)
# except psycopg2.OperationalError:
#     sys.exit(-1)
# sys.exit(0)
# END
# }

# until postgres_ready; do
#   >&2 echo "Postgres is unavailable - sleeping"
#   sleep 1
# done

# >&2 echo "Postgres is up - continuing..."
# exec $cmd

python3 backend/manage.py makemigrations --no-input
python3 backend/manage.py migrate --no-input
python3 backend/manage.py collectstatic --no-input

# python3 backend/manage.py runserver 0.0.0.0:$PORT
# gunicorn config.wsgi -w 4 --worker-class gevent -b 0.0.0.0:$PORT --chdir=/app
gunicorn config.wsgi -w 4 --worker-class gevent -b 0.0.0.0:$PORT

# ./backend & 
# sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/nginx.conf && nginx -g 'daemon off;'