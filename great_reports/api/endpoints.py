from django.conf.urls import include, url
from rest_framework import routers

from .views import (ReportViewSet, PlanViewSet, NoteViewSet,
                    RegistrationAPI, LoginAPI, UserAPI)


router = routers.DefaultRouter()
router.register('reports', ReportViewSet, 'reports')
router.register('plans', PlanViewSet, 'plans')
router.register('notes', NoteViewSet, 'notes')


urlpatterns = [
    url('^', include(router.urls)),
    url('^auth/register/$', RegistrationAPI.as_view()),
    url('^auth/login/$', LoginAPI.as_view()),
    url('^auth/user/$', UserAPI.as_view()),
]
