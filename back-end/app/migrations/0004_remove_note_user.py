# Generated by Django 5.0.6 on 2024-05-21 15:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_mood"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="note",
            name="user",
        ),
    ]
