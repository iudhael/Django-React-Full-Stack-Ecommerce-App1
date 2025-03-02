from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from .models import *
# Register your models here.

admin.site.register(Userinfo)
admin.site.register(Categorie)
admin.site.register(Product)
admin.site.register(ImageDetailProduct)
admin.site.register(Order)
admin.site.register(OrderItem)






