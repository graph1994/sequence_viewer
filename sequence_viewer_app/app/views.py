from rest_framework import viewsets

from .models import Sequence
from .serializers import SequenceSerializer


class SequenceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows a sequence object to be viewed or edited.
    """
    queryset = Sequence.objects.all().order_by('-created_at')
    serializer_class = SequenceSerializer



