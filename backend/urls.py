from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from calendarapp import views
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register(r'calendar', views.CalendarItemView, 'calendarapp')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
