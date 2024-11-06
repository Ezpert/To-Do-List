from django.db import models


# Create your models here.

class ToDoModel(models.Model):
    PRIORITY_1 = "P1"
    PRIORITY_2 = "P2"
    PRIORITY_3 = "P3"
    PRIORITY_4 = "P4"

    PRIORITIES = {
        PRIORITY_1: "Priority 1",
        PRIORITY_2: "Priority 2",
        PRIORITY_3: "Priority 3",
        PRIORITY_4: "Priority 4",
    }

    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    category = models.CharField(max_length=100, default='General')
    due_date = models.DateTimeField(default=None)
    priority = models.CharField(
        max_length=2,
        choices=PRIORITIES,
        default=PRIORITY_4,
    )
    complete = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.user', related_name='todo', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
