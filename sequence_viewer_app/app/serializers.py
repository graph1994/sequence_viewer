from rest_framework import serializers
from .models import Sequence


class SequenceSerializer(serializers.HyperlinkedModelSerializer):

    def validate(self, data):
        allow_chars = 'ACTG'
        if not all(c in allow_chars for c in set(data['sequence'])):
            raise serializers.ValidationError('A valid DNA strand has only A, C, T and, G.')
        if data['sequence'] in Sequence.objects.all().values_list('sequence', flat=True):
            raise serializers.ValidationError('Sequence already exists in database.')
        return data

    class Meta:
        model = Sequence
        fields = ('id', 'name', 'description', 'sequence', 'created_at')