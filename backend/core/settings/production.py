from .base import *

import os
import dj_database_url


DEBUG = False


ALLOWED_HOSTS = [

    ".onrender.com",
    "localhost"
    
]


DATABASES = {

    "default":

    dj_database_url.config(

        default=os.environ.get(
            "DATABASE_URL"
        ),

        conn_max_age=600

    )

}



MIDDLEWARE = [

    "django.middleware.security.SecurityMiddleware",

    "whitenoise.middleware.WhiteNoiseMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

]


STATIC_ROOT = BASE_DIR / "staticfiles"


STATICFILES_STORAGE = (

    "whitenoise.storage.CompressedManifestStaticFilesStorage"

)