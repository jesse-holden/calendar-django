from django.db import models
# from django.conf import settings

# Create your models here.


class CalendarItem(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=120)
    time = models.TimeField()

    def _str_(self):
        return self.title
