from django.contrib import admin
from django.urls import path, include, reverse_lazy
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('', RedirectView.as_view(url=reverse_lazy('swagger-ui'), permanent=False)),
    path("api/coffee/",include("coffee.urls"))
]
