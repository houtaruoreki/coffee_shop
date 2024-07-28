from django.db import models

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_place=2)
    description = models.TextField(blank=True)
    def __str__(self):
        return self.name
class Coffee(models.Model):
    title = models.CharField(max_length=255)
    Ingredients = models.ManytoManyField(Ingredient, related_name='coffees')
    description = models.TextField(blank=True)

    @property
    def total_price(self):
        Ingredient_prices = self.ingredients.aggregate(total_price=models.Sum('price'))['total_price'] or 0.00
        return 2.00 + Ingredient_prices

