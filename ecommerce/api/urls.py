from django.urls import path, re_path





from .views import *
from dj_rest_auth.views import  PasswordChangeView, LogoutView, PasswordResetView
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView


app_name = "api_ecommerce"

urlpatterns = [


    path('dj-rest-auth/registration/account-confirm-email/<str:key>/',ConfirmEmailView.as_view(),),
    path('dj-rest-auth/logout/', LogoutView.as_view()),

    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    


    path('rest-auth/password/change/', PasswordChangeView.as_view()), 


    path('dj-rest-auth/registration/', CustomRegisterView.as_view(), name='custom-register'),
    
    path('dj-rest-auth/user/', CustomUserDetailsView.as_view(), name='custom-user-details'),
    path("authentification/update-user/<int:pk>/", UpdateUserView.as_view(), name="update-user"),
    path("authentification/update-user-tel/<int:pk>/", UpdateUserTelView.as_view(), name="update-user-tel"),

    path("list/categorie-events/",  ListCategorieView.as_view(), name="list-categorie"),

    path("list-produit/", ListProductView.as_view(), name="list-produit"),
    path("detail/produit/<int:pk>/", DetailProductView.as_view(), name="detail-produit"),


    
    path("create-commande/", OrderUserView.as_view(), name="create-commande"),
    path("create/commande-item/", OrderItemUserView.as_view(), name="create-commande-item"),
    

    path("list-commande/", OrderView.as_view(), name="list-commande"),
    path("update-commande/<int:pk>/", UpdateOrderView.as_view(), name="update-commande"), #update patch
    path("detail/commande-item/", OrderItemView.as_view(), name="detail-commande-item"),




]