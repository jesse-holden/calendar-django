from rest_framework import serializers
from .models import CalendarItem


class CalendarItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarItem
        fields = ('id', 'title', 'date', 'time')
