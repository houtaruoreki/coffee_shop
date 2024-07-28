from django.urls import path, include
from rest_framework import routers 
import views

router = routers.DefaultRouter()
router.register(r'ingredients', views.IngredientViewSet)
router.register(r'coffees', views.CoffeeViewSet)
urlpatterns = [
    path("", include(router.urls)),
]