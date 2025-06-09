from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def log_answer(request):
    question = request.data.get('question')
    selected = request.data.get('selected')
    print(f"[SERVER LOG] Question: {question}")
    print(f"[SERVER LOG] Selected Answer: {selected}")
    return Response({"message": "Answer received"})
