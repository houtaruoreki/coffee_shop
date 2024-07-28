from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Coffee(models.Model):
    title = models.CharField(max_length=255)
    ingredients = models.ManyToManyField(Ingredient, related_name='coffees')
    description = models.TextField(blank=True)

    @property
    def total_price(self):
        ingredient_prices = self.ingredients.aggregate(total_price=models.Sum('price'))['total_price'] or 0.00
        return 2.00 + ingredient_prices
