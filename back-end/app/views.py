import datetime
import random

from django.utils.dateparse import parse_date
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Advice, Note, Mood
from .serializers import AdviceSerializer, NoteSerializer, NoteListSerializer, MoodSerializer
from django.db.models import Avg, Count, Max

from app import models



class RandomAdviceView(APIView):
    def get(self, request):
        advices = Advice.objects.all()
        if not advices:
            return Response({"detail": "No advices found."}, status=status.HTTP_404_NOT_FOUND)
        random_advice = random.choice(advices)
        serializer = AdviceSerializer(random_advice)
        return Response(serializer.data)


class AddAdviceView(APIView):
    def post(self, request):
        serializer = AdviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddNoteView(APIView):
    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoteListView(APIView):
    def get(self, request):
        notes = Note.objects.all()
        serializer = NoteListSerializer(notes, many=True)
        return Response(serializer.data)


class NoteDetailView(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = 'id'


class MoodCreateView(generics.CreateAPIView):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer


class MoodListView(generics.ListAPIView):
    serializer_class = MoodSerializer

    def get_queryset(self):
        queryset = Mood.objects.all()
        start_date_param = self.request.query_params.get('start_date', None)
        end_date_param = self.request.query_params.get('end_date', None)
        if start_date_param and end_date_param:
            start_date = parse_date(start_date_param)
            end_date = parse_date(end_date_param)
            if start_date and end_date:
                queryset = queryset.filter(date__range=[start_date, end_date])
            else:
                queryset = Mood.objects.none()  # return empty queryset if start_date or end_date is invalid
        return queryset

    def list(self, request, *args, **kwargs):
        start_date_param = request.query_params.get('start_date', None)
        end_date_param = request.query_params.get('end_date', None)
        if start_date_param and end_date_param:
            start_date = parse_date(start_date_param)
            end_date = parse_date(end_date_param)
            if not start_date or not end_date:
                return Response({"detail": "Invalid start_date or end_date."}, status=status.HTTP_400_BAD_REQUEST)
            
            delta = end_date - start_date
            date_range = [start_date + datetime.timedelta(days=i) for i in range(delta.days + 1)]
            
            queryset = self.get_queryset()
            moods_by_date = {date: {"type_of_mood": "", "color": "", "rate": 0} for date in date_range}
            
            for mood in queryset:
                moods_by_date[mood.date] = {
                    "type_of_mood": mood.type_of_mood,
                    "color": mood.color,
                    "rate": mood.rate
                }
            
            response_data = [
                {
                    "date": date.strftime("%Y-%m-%d"),
                    "type_of_mood": data["type_of_mood"],
                    "color": data["color"],
                    "rate": data["rate"]
                }
                for date, data in moods_by_date.items()
            ]
            return Response(response_data)
        
        return Response({"detail": "start_date and end_date parameters are required."}, status=status.HTTP_400_BAD_REQUEST)



class MoodStatsView(generics.ListAPIView):
    serializer_class = MoodSerializer

    def get_queryset(self):
        queryset = Mood.objects.all()
        start_date_param = self.request.query_params.get('start_date', None)
        end_date_param = self.request.query_params.get('end_date', None)
        if start_date_param and end_date_param:
            start_date = parse_date(start_date_param)
            end_date = parse_date(end_date_param)
            if start_date and end_date:
                queryset = queryset.filter(date__range=[start_date, end_date])
            else:
                queryset = Mood.objects.none()  # return empty queryset if start_date or end_date is invalid
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        mood_stats = queryset.values('type_of_mood').annotate(
            mood_count=Count('id'),
            avg_rate=Avg('rate'),
            color=Max('color')
        )
        response_data = []
        for stats in mood_stats:
            response_data.append({
                "type_of_mood": stats["type_of_mood"],
                "count": stats["mood_count"],
                "avg_rate": round(stats["avg_rate"], 2) if stats["avg_rate"] else None,
                "color": stats["color"]
            })
        return Response(response_data)



class NoteDeleteAPIView(APIView):
    def delete(self, request, note_id):
        try:
            note = Note.objects.get(pk=note_id)
            note.delete()
            return Response({'message': 'Note deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Note.DoesNotExist:
            return Response({'error': 'Note does not exist.'}, status=status.HTTP_404_NOT_FOUND)
