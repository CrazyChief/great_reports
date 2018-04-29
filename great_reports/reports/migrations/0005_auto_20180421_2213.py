# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-04-21 22:13
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('reports', '0004_auto_20180417_2219'),
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250, verbose_name='Title')),
                ('description', models.TextField(verbose_name='Description')),
                ('estimate', models.TimeField(blank=True, null=True, verbose_name='Estimated time')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Note',
                'verbose_name_plural': 'Notes',
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_for', models.DateField(verbose_name='Date for')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Plan',
                'verbose_name_plural': 'Plans',
            },
        ),
        migrations.AddField(
            model_name='note',
            name='plan',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plans', to='reports.Plan', verbose_name='Plan'),
        ),
    ]