
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('base.urls')),
    path('admin/', admin.site.urls),
    path('base/', include('base.urls')),
    path('api/', include('base.api_urls')),
    path('api-auth/', include('rest_framework.urls')),
]
