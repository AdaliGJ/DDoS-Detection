from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()
  
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Escoje otro correo')
   
    if not password or len(password) < 10:
        raise ValidationError('Escoje otra contraseña con al menos 10 caracteres')
  
    if not username:
        raise ValidationError('Escoje otro nombre de usuario')
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('Se requiere un correo')
    return True

def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('Escoje otro usuario')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('Se requiere una contraseña')
    return True