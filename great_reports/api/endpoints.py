from django.conf.urls import include, url
from rest_framework import routers

from .views import ReportViewSet


router = routers.DefaultRouter()
router.register('reports', ReportViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
]
