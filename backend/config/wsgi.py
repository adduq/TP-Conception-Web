import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
# os.environ.setdefault('DJANGO_SETTINGS_MODULE',
#                       os.environ.get('DJANGO_SETTINGS_MODULE_NAME'))

application = get_wsgi_application()
