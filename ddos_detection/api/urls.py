from django.urls import path
from .views import UserView
from .views import capture_packets


urlpatterns = [
  path('users', UserView.as_view()),
  path('capture/', capture_packets, name='capture_packets')
]