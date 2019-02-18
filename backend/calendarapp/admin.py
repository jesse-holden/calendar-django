from django.contrib import admin

# Register your models here.
from .models import CalendarItem  # add this


class CalendarappAdmin(admin.ModelAdmin):  # add this
    list_display = ('title', 'date', 'time')  # add this


# Register your models here.
admin.site.register(CalendarItem, CalendarappAdmin)  # add this
