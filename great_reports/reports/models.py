from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class Plan(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, verbose_name=_('User'))
    date_for = models.DateField(verbose_name=_('Date for'))
    created = models.DateTimeField(
        auto_now_add=True, verbose_name=_('Created at'))

    class Meta:
        ordering = ['-date_for']
        verbose_name = _('Plan')
        verbose_name_plural = _('Plans')

    def __str__(self):
        return f'Plan by {self.owner} for {self.date_for}'


class Note(models.Model):
    plan = models.ForeignKey(
        Plan, related_name='plans',
        on_delete=models.CASCADE, verbose_name=_('Plan'))
    title = models.CharField(verbose_name=_('Title'), max_length=250)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, verbose_name=_('User'))
    description = models.TextField(verbose_name=_('Description'))
    estimate = models.TimeField(
        verbose_name=_('Estimated time'), null=True, blank=True)
    spent_time = models.TimeField(
        verbose_name=_('Spent time'), null=True, blank=True)
    created = models.DateTimeField(
        auto_now_add=True, verbose_name=_('Created at'))
    updated = models.DateTimeField(verbose_name=_('Updated'), auto_now=True)

    class Meta:
        ordering = ['created']
        verbose_name = _('Note')
        verbose_name_plural = _('Notes')

    def __str__(self):
        return f'By {self.owner}: {self.title}'


class Report(models.Model):
    text = models.CharField(verbose_name=_('Title'), max_length=250)
    owner = models.ForeignKey(
        User, related_name='reports', on_delete=models.CASCADE, null=True,
        verbose_name=_('User'))
    description = models.TextField(
        verbose_name=_('Description'), null=True, blank=True)
    estimate = models.TimeField(
        verbose_name=_('Estimated time'), null=True, blank=True)
    spent_time = models.TimeField(
        verbose_name=_('Spent time'), null=True, blank=True)
    created = models.DateTimeField(
        verbose_name=_('Created'), auto_now_add=True)
    updated = models.DateTimeField(verbose_name=_('Updated'), auto_now=True)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Report')
        verbose_name_plural = _('Reports')

    def __str__(self):
        return f'{self.text}'
