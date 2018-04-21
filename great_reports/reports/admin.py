from django.contrib import admin

from .models import Plan, Note, Report


class NoteInline(admin.TabularInline):
    model = Note


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    inlines = [NoteInline]


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    pass
