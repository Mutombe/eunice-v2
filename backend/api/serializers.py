"""DRF serializers. Public content serializers output the camelCase shape the
React frontend already expects, so wiring the frontend later is a clean swap."""
from rest_framework import serializers
from .models import (
    Practice, Programme, JournalPost, Product, Testimonial,
    Enquiry, NewsletterSubscriber, SiteSettings, MediaAsset, PageView,
)


class PracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practice
        fields = ["slug", "num", "title", "discipline", "short",
                  "body", "formats", "image"]


class ProgrammeSerializer(serializers.ModelSerializer):
    italicTitle = serializers.CharField(source="italic_title", required=False, allow_blank=True)
    imageCaption = serializers.CharField(source="image_caption", required=False, allow_blank=True)
    ctaLabel = serializers.CharField(source="cta_label", required=False, allow_blank=True)
    ctaTo = serializers.CharField(source="cta_to", required=False, allow_blank=True)

    class Meta:
        model = Programme
        fields = ["slug", "num", "title", "italicTitle", "discipline", "lede",
                  "problem", "transformation", "modules", "inclusions",
                  "duration", "cadence", "format", "price",
                  "cover", "imageCaption", "ctaLabel", "ctaTo",
                  "featured", "order"]


class JournalPostSerializer(serializers.ModelSerializer):
    readTime = serializers.CharField(source="read_time", required=False, allow_blank=True)
    isPremium = serializers.BooleanField(source="is_premium", required=False)

    class Meta:
        model = JournalPost
        fields = ["slug", "num", "title", "deck", "section", "date",
                  "readTime", "isPremium", "cover", "body"]


class ProductSerializer(serializers.ModelSerializer):
    italicTitle = serializers.CharField(source="italic_title", required=False, allow_blank=True)

    class Meta:
        model = Product
        fields = ["slug", "num", "name", "italicTitle", "subtitle", "series",
                  "edition", "stamp", "format", "pages", "binding", "kind",
                  "price", "tone", "cover", "blurb", "featured"]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["quote", "name", "role"]


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ["id", "name", "email", "interest", "budget", "note",
                  "handled", "created_at"]
        read_only_fields = ["id", "handled", "created_at"]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["id", "email", "created_at"]
        read_only_fields = ["id", "created_at"]


class SiteSettingsSerializer(serializers.ModelSerializer):
    # Frontend expects `navLinks`; the model field is `nav`.
    navLinks = serializers.JSONField(source="nav", required=False)

    class Meta:
        model = SiteSettings
        fields = [
            "brand", "navLinks", "hero", "studio", "membership", "contact", "notification",
            # Phase 3 content blocks
            "about", "speaking", "retreats", "legal",
        ]


class MediaAssetSerializer(serializers.ModelSerializer):
    """Returns an absolute URL the frontend can drop into image fields."""
    url = serializers.SerializerMethodField()

    class Meta:
        model = MediaAsset
        fields = ["id", "file", "url", "label", "created_at"]
        read_only_fields = ["id", "url", "created_at"]
        extra_kwargs = {"file": {"write_only": True}}

    def get_url(self, obj):
        request = self.context.get("request")
        url = obj.file.url
        return request.build_absolute_uri(url) if request else url


class PageViewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageView
        fields = ["path", "referrer"]

    def validate_path(self, value):
        if not value or not value.startswith("/"):
            raise serializers.ValidationError("Path must start with /")
        return value[:500]
