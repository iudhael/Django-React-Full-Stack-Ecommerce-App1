from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
import re
from dj_rest_auth.registration.serializers import RegisterSerializer

from phonenumber_field.serializerfields import PhoneNumberField


        
        

#afficher les infos 
class UserInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Userinfo
        fields = ("id", "tel", "user",)
        read_only_fields = ['user']

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(min_length=3, max_length=50, required=True)
    last_name = serializers.CharField(min_length=3, max_length=50, required=True)
    username = serializers.CharField(min_length=4, max_length=50, required=True)
    password1 = serializers.CharField(style={'input_type' : 'password'}, write_only =True)
    password2 = serializers.CharField(style={'input_type' : 'password'}, write_only =True)

    user_info_tel = PhoneNumberField()



    class Meta:
        model = User  # Remplacez par le nom de votre modèle utilisateur
        fields = ('first_name', 'last_name', 'username', 'email', 'password1', 'password2', "user_info_tel")


    
    def validate_password1(self, value):
        regex_pattern = "(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}"
        if not re.match(regex_pattern, value):
            raise serializers.ValidationError("Le mot de passe ne suit pas le format requis : au moins 8 caractères, au moins une majuscule, au moins un chiffre.")
        return value
    
    
    """
    def validate_email(self, value):
        user = User.objects.filter(email=value).count()
        if user >= 1:
            raise serializers.ValidationError("Cet utilisateur existe dejà!")
        return value
    """


    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        telephone = self.validated_data.get('user_info_tel', '')

        user.save()
        
        Userinfo.objects.create(user=user, tel=telephone)
        
        
    """
    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['tel'] = self.validated_data.get('user_info_tel', '')
        return data_dict
    """



class CustumUserSerializer(serializers.ModelSerializer):

    user_info_id = serializers.CharField(source='userinfo.id', read_only=True)
    user_info_tel = serializers.CharField(source='userinfo.tel', read_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'user_info_id', 'user_info_tel')
    



class UserUpdateSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(min_length=3, max_length=50, required=True)
    last_name = serializers.CharField(min_length=3, max_length=50, required=True)
    


    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class UserTelUpdateSerializer(serializers.ModelSerializer):
    tel = PhoneNumberField()
    class Meta:
        model = Userinfo
        fields = ('tel',)






class CategorieSerializer(serializers.ModelSerializer):


    class Meta:
        model = Categorie
        fields = ("__all__")

class ListIamgeDetailProductSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = ImageDetailProduct
        fields = ("id", "image", "produit_image")
        
class ListProductSerializer(serializers.ModelSerializer):
   # detail_produit_images = serializers.ImageField(source='ImageDetailProduct.image', read_only=True)
    detail_produit_images = ListIamgeDetailProductSerializer(source='imagedetailproduct_set', many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "digital", "image", "categorie", "detail_produit_images",)
        read_only_fields = ['name']




class OrderSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Order
        fields = ("id","user", "date_ordered", "eta", "address", "city", "state", "total_price", "username")

class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("__all__")


class OrderItemSerializer(serializers.ModelSerializer):
    produit_image = serializers.ImageField(source='produit.image', read_only=True)
    produit_name = serializers.CharField(source='produit.name', read_only=True)
    produit_price = serializers.CharField(source='produit.price', read_only=True)
    class Meta:
        model = OrderItem
        fields = ("id", "produit", "order", "quantity", "total_price_per_item", "date_added", "produit_image", "produit_name", "produit_price")


