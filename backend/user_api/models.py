from django.db import models

from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin



class AppUserManager(BaseUserManager):
	
    
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('Se requiere un correo')
		if not password:
			raise ValueError('Se requiere una contraseña')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('Se requiere un correo')
		if not password:
			raise ValueError('Se requiere una contraseña')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user
	

   


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username