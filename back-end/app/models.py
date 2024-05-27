from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Note(models.Model):
    category = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateField()


class Advice(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()


class Mood(models.Model):

    MOOD_CHOICES = [
        ("Задоволення", "Задоволення"),
        ("Сум", "Сум"),
        ("Злість", "Злість"),
        ("Страх", "Страх"),
        ("Відраза", "Відраза"),
    ]
    type_of_mood = models.CharField(max_length=255, choices=MOOD_CHOICES)
    rate = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    color = models.CharField(max_length=255, null=True)
    date = models.DateField()
