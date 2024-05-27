from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from user import views
from user.views import CreateUserView


urlpatterns = [
    path("register", CreateUserView.as_view(), name="create"),
    path("login", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
]

app_name = "user"
