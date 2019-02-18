from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from calendarapp import views

router = routers.DefaultRouter()
router.register(r'calendar', views.CalendarItemView, 'calendarapp')

urlpatterns = [
    path('admin/', admin.site.urls),         path('api/', include(router.urls))
]
