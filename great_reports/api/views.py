from rest_framework import viewsets, permissions

from reports.models import Report
from .serializers import ReportSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ReportSerializer
