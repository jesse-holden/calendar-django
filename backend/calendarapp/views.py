from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import CalendarItemSerializer
from .models import CalendarItem

# Create your views here.


def index(request):
    return HttpResponse("Hello world!")


class CalendarItemView(viewsets.ModelViewSet):
    serializer_class = CalendarItemSerializer
    queryset = CalendarItem.objects.all()
