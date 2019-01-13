from django.db import models


class Sequence(models.Model):
    name = models.CharField(max_length=300)
    description = models.CharField(max_length=500)
    sequence = models.CharField(max_length=25000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
