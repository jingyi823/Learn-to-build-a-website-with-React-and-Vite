from django.urls import path
from .views import log_answer

urlpatterns = [
    path('log-answer/', log_answer),
]
