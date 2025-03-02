from rest_framework import authentication, permissions, generics, mixins, status
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.views import  UserDetailsView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from .permissions import *
from rest_framework.pagination import PageNumberPagination
from dj_rest_auth.views import  PasswordResetView

# Create your views here.

"""
from dj_rest_auth.registration.views import ConfirmEmailView

class CustomConfirmEmailView(ConfirmEmailView):
    template_name = 'emailConfimation.html'
"""
from django.shortcuts import HttpResponseRedirect
#from django.contrib.auth.tokens import validate_token 
from dj_rest_auth.views import PasswordResetConfirmView
from django.core.exceptions import ValidationError




#inscription avec dj-rest-auth et allauth
class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

#detail de l'utilisateur connecter
class CustomUserDetailsView(UserDetailsView):
    #authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]
    serializer_class = CustumUserSerializer

#update first_name, last_name, email with put or patch
class UpdateUserView(generics.RetrieveUpdateAPIView):
    #authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer

class UpdateUserTelView(generics.RetrieveUpdateAPIView):
    #authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAuthenticated]
    queryset = Userinfo.objects.all()
    serializer_class = UserTelUpdateSerializer
    

class UserLogoutView(LogoutView):
    pass

class ListCategorieView(generics.ListAPIView):

    queryset = Categorie.objects.all().order_by("-id")
    serializer_class = CategorieSerializer

#Afficher les evenements aux utilisateurs
class ListProductView(generics.ListAPIView):
    queryset = Product.objects.all().order_by("-id")
    serializer_class = ListProductSerializer
    pagination_class = PageNumberPagination  
    pagination_class.page_size = 3

    filterset_fields = ["categorie"]
    
    search_fields = ["name"]

#Afficher le detail des evenements au utilisateurs
class DetailProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ListProductSerializer

class OrderUserView(generics.CreateAPIView):  
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all().order_by("-id")
    serializer_class = OrderSerializer 
    filterset_fields = ["eta"]


class OrderItemUserView(generics.CreateAPIView): 
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = OrderItem.objects.all().order_by("-id")
    serializer_class = OrderItemSerializer 
    filterset_fields = ["order"]



    
    

#admin
class OrderView(generics.ListAPIView):  
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticated]
    queryset = Order.objects.all().order_by("-id")
    serializer_class = OrderSerializer 
    filterset_fields = ["eta"]

class UpdateOrderView(generics.UpdateAPIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticated ]
    queryset = Order.objects.all().order_by("-id")
    serializer_class = UpdateOrderSerializer 

class OrderItemView(generics.ListAPIView): 
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticated]
    queryset = OrderItem.objects.all().order_by("-id")
    serializer_class = OrderItemSerializer 
    filterset_fields = ["order"]


    
    
    

