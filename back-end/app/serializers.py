from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers
from .models import Advice, Note, Mood


class AdviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advice
        fields = ['title', 'content']


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['category', 'topic', 'content', 'date']


class NoteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'category', 'topic', 'date']


class NoteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'category', 'topic', 'content', 'date']


class MoodSerializer(serializers.ModelSerializer):
    rate = serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        model = Mood
        fields = '__all__'