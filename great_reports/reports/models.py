from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class Report(models.Model):
    # user = models.ForeignKey(User, verbose_name=_('User'))
    text = models.CharField(verbose_name=_('Title'), max_length=250)
    # description = models.TextField(verbose_name=_('Description'))
    # spent_time = models.TimeField(verbose_name=_('Spent time'))
    created = models.DateTimeField(verbose_name=_('Created'), auto_now_add=True)
    updated = models.DateTimeField(verbose_name=_('Updated'), auto_now=True)

    class Meta:
        verbose_name = _('Report')
        verbose_name_plural = _('Reports')

    def __str__(self):
        return f'{self.text}'
