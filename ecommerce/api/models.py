from django.db import models
from django.contrib.auth.models import User
import os, shutil
from PIL import Image
from django.core.validators import MinValueValidator
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class Userinfo(models.Model):
    tel = PhoneNumberField("User tel", unique=True, null=True, blank=True)
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "User info"

    def __str__(self):
        return str (self.user.pk) + " " +self.user.username
    
class Categorie(models.Model):
    name = models.CharField("nom de la categorie", max_length=50, unique=True, default="jeunesse") #exclure le default apres
    img_categorie = models.ImageField("image de la categorie")

    class Meta:
        verbose_name = "Categorie Produit"

    def __str__(self):
        return self.name
    

    def save(self, *args, **kwargs): # remplacer la methode de sauvegarde por ajouter des fonctionaliter au save parent
        super(Categorie, self).save(*args, **kwargs)

        #chemin actuel de l'image
        chemin_actuel = str(self.img_categorie)

        picture_name =  chemin_actuel.split('/')[-1]

        extension = os.path.splitext(picture_name)[-1]
        
        new_picture_name = self.name + extension

        new_dossier = f'media/categories'

        #chemin par defaut de l'enregistrement de l'image 
        default_chemin =f'media/{picture_name}'

        #nouveau chemin de l'enregistrement de l'Image
        new_chemin =f'{new_dossier}/{new_picture_name}'

        if not os.path.isdir(new_dossier):
            os.makedirs(new_dossier)
        
        if os.path.isfile(default_chemin):
            new_chemin_actuel = f'categories/{new_picture_name}'
            shutil.move(default_chemin, new_chemin)
            self.img_categorie = new_chemin_actuel
            self.save()
            
        """
        img = Image.open(self.img_categorie.path)  #on ouvre l'image acctuelle et on va redimentionner
        
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)   #redimentioner 300/300
            img.save(self.img_categorie.path)
        """
        
    
class Product(models.Model):
    name = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    digital = models.BooleanField(default= False, null= True, blank= True)
    image = models.ImageField("image du produit", null=True, blank=True)
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "Product"

    def __str__(self):
        return str(self.image)

    
    def save(self, *args, **kwargs): # remplacer la methode de sauvegarde por ajouter des fonctionaliter au save parent
        super(Product, self).save(*args, **kwargs)

        #chemin actuel de l'image
        
        chemin_actuel_image = str(self.image)
        
        
        picture_name_image=  chemin_actuel_image.split('/')[-1]
        
        
        extension_image = os.path.splitext(picture_name_image)[-1]
        
        
        new_picture_name_image = "image" + extension_image
        
        new_dossier = f'media/{self.name}'
        
        #chemin par defaut de l'enregistrement de l'image 
        
        default_chemin_image =f'media/{picture_name_image}'
        
        #nouveau chemin de l'enregistrement de l'Image
        
        new_chemin_image =f'media/{self.name}/{new_picture_name_image}'

        
        if not os.path.isdir(new_dossier):
            os.makedirs(new_dossier)

        
            
        if os.path.isfile(default_chemin_image):
            new_chemin_actuel_image = f'{self.name}/{new_picture_name_image}'
            shutil.move(default_chemin_image, new_chemin_image)
            self.image = new_chemin_actuel_image
            self.save()
        """
        img_banner = Image.open(self.banner.path)  #on ouvre l'image acctuelle et on va redimentionner
       
        if img_banner.height > 300 or img_banner.width > 300:
            output_size = (300, 300)
            img_banner.thumbnail(output_size)   #redimentioner 300/300
            img_banner.save(self.banner.path)
        """

    
class ImageDetailProduct(models.Model):
    image = models.ImageField("image du produit", null=True, blank=True)
    produit_image = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "ImageDetailProduct"

    def __str__(self):
        return str(self.image)

    
    def save(self, *args, **kwargs): # remplacer la methode de sauvegarde por ajouter des fonctionaliter au save parent
        super(ImageDetailProduct, self).save(*args, **kwargs)

        #chemin actuel de l'image
        
        chemin_actuel_image = str(self.image)
        
        
        picture_name_image =  chemin_actuel_image.split('/')[-1]
        
        
        #extension_image = os.path.splitext(picture_name_image)[-1]
        
        
        new_picture_name_image = picture_name_image
        
        new_dossier = f'media/{self.produit_image.name}'
        
        #chemin par defaut de l'enregistrement de l'image 
        
        default_chemin_image =f'media/{picture_name_image}'
        
        #nouveau chemin de l'enregistrement de l'Image
        
        new_chemin_image =f'media/{self.produit_image.name}/{new_picture_name_image}'

        
        if not os.path.isdir(new_dossier):
            os.makedirs(new_dossier)

        
            
        if os.path.isfile(default_chemin_image):
            new_chemin_actuel_image = f'{self.produit_image.name}/{new_picture_name_image}'
            shutil.move(default_chemin_image, new_chemin_image)
            self.image = new_chemin_actuel_image
            self.save()
        
        
        img = Image.open(self.image.path)  #on ouvre l'image acctuelle et on va redimentionner
       
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)   #redimentioner 300/300
            img.save(self.image.path)
            
        

LIVRER = 'livrer'
ATTENTE = 'attente'
NON_LIVRER = 'non-livrer'

STATUS_CHOICES = [
    (LIVRER, 'LIVRER'),
    (ATTENTE, 'ATTENTE'),
    (NON_LIVRER, 'NON LIVRER'),
]


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null = True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add= True)
    eta = models.CharField("état de la commande", max_length=10, choices=STATUS_CHOICES, default=ATTENTE,)
    address = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=20, null=True)
    state = models.CharField(max_length=20, null=True)
    total_price = models.DecimalField(max_digits=7, decimal_places=2)
    #complete = models.BooleanField(default= False, null= True, blank= True)
    #transaction_id = models.CharField(max_length=200, null=True)

    class Meta:
        verbose_name = "Order"
    def __str__(self):
        return str(self.id)

class OrderItem(models.Model):
    produit = models.ForeignKey(Product, on_delete=models.SET_NULL, null = True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null = True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    total_price_per_item = models.DecimalField(max_digits=7, decimal_places=2, null = True, blank=True)
    date_added = models.DateTimeField(auto_now_add= True)
    
    class Meta:
        verbose_name = "Order Item"

    def __str__(self):
        return str(self.produit)

""" 
class ShippingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null = True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null = True, blank=True)
    address = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=20, null=True)
    state = models.CharField(max_length=20, null=True)
    date_added = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.address
"""