"""ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from api.views import *

from dj_rest_auth.views import  PasswordResetView, PasswordResetConfirmView
import re



urlpatterns = [
    path('ecommerce/admin_panel/', admin.site.urls),

    



    #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    #path('account/', include('allauth.urls')),

    path("api/", include("api.urls", namespace="api")),
    
   
    path('reset-password-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'), 

]


if settings.DEBUG:

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# Une fonction pour récupérer UID et token
def extract_uid_and_token(url):
    match = re.search(r'/password-reset-confirm/(?P<uidb64>[^/]+)/(?P<token>[^/]+)/$', url)
    if match:
        return match.group('uidb64'), match.group('token')
    return None, None

# Exemple d'utilisation :
url = "http://127.0.0.1:8000/password-reset-confirm/n/c6g7rw-d6f7491c1b91d2e7c189482dddd0eb37/"
uid, token = extract_uid_and_token(url)
#print("UID:", uid)
#print("Token:", token)

