"""Django admin registrations — a fallback CMS alongside the custom React admin."""
from django.contrib import admin
from .models import (
    Practice, Programme, JournalPost, Product, Testimonial,
    Enquiry, NewsletterSubscriber, SiteSettings, MediaAsset, PageView,
)


@admin.register(Practice)
class PracticeAdmin(admin.ModelAdmin):
    list_display = ("num", "title", "discipline", "order")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order",)


@admin.register(Programme)
class ProgrammeAdmin(admin.ModelAdmin):
    list_display = ("num", "title", "discipline", "price", "featured", "order")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("featured",)
    ordering = ("order",)


@admin.register(JournalPost)
class JournalPostAdmin(admin.ModelAdmin):
    list_display = ("num", "title", "section", "is_premium", "published", "order")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("section", "is_premium", "published")
    ordering = ("order",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("num", "name", "series", "price", "featured", "order")
    prepopulated_fields = {"slug": ("name",)}
    list_filter = ("featured", "series")
    ordering = ("order",)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order")
    ordering = ("order",)


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "interest", "handled", "created_at")
    list_filter = ("handled", "interest")
    readonly_fields = ("name", "email", "interest", "budget", "note", "created_at")


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    readonly_fields = ("email", "created_at")


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("__str__", "updated_at")


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ("__str__", "file", "created_at")
    readonly_fields = ("created_at", "updated_at")


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("path", "referrer", "created_at")
    list_filter = ("path",)
    readonly_fields = ("path", "referrer", "created_at")
    date_hierarchy = "created_at"
