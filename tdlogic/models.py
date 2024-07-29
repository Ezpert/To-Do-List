from django.db import models


# Create your models here.

class ToDoModel(models.Model):



    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    category = models.CharField(max_length=100, default='General')
    due_date = models.DateTimeField(default=None)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
