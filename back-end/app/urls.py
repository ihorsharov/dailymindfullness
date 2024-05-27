from django.urls import path
from .views import NoteDeleteAPIView, RandomAdviceView, AddAdviceView, AddNoteView, NoteListView, NoteDetailView, \
    MoodCreateView, MoodListView, MoodStatsView

urlpatterns = [
    path('random-advice', RandomAdviceView.as_view(), name='random-advice'),
    path('add-advice', AddAdviceView.as_view(), name='add-advice'),
    path('add-note', AddNoteView.as_view(), name='add-note'),
    path('notes', NoteListView.as_view(), name='note-list'),
    path('note/<int:id>', NoteDetailView.as_view(), name='note-detail'),
    path('mood/create', MoodCreateView.as_view(), name='mood-create'),
    path('mood/', MoodListView.as_view(), name='mood-list'),
    path('mood-stats/', MoodStatsView.as_view(), name='mood-stats'),
    path('notes/delete/<int:note_id>', NoteDeleteAPIView.as_view(), name='delete_note'),

]

app_name = "app"
