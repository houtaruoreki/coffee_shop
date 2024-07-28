from rest_framework import serializers
from .models import Coffee, Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class CoffeeSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Coffee
        fields = ['id', 'title', 'ingredients', 'description', 'total_price']

    def get_total_price(self, obj):
        return obj.total_price
