"""API views — a health check, read/write content endpoints, and public
form-submission endpoints."""
from rest_framework import viewsets, mixins, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (
    AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response

from .models import (
    Practice, Programme, JournalPost, Product, Testimonial,
    Enquiry, NewsletterSubscriber, SiteSettings, MediaAsset, PageView,
)
from .serializers import (
    PracticeSerializer, ProgrammeSerializer, JournalPostSerializer,
    ProductSerializer, TestimonialSerializer, EnquirySerializer,
    NewsletterSubscriberSerializer, SiteSettingsSerializer, MediaAssetSerializer,
    PageViewCreateSerializer,
)
from .integrations.mailerlite import push_subscriber as _push_to_mailerlite


@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    """Health check — confirms the API is reachable."""
    return Response({"status": "ok", "service": "eunice-backend"})


# --- Content — public read, authenticated write -------------------------

class PracticeViewSet(viewsets.ModelViewSet):
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    pagination_class = None


class ProgrammeViewSet(viewsets.ModelViewSet):
    queryset = Programme.objects.all()
    serializer_class = ProgrammeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    pagination_class = None


class JournalPostViewSet(viewsets.ModelViewSet):
    queryset = JournalPost.objects.filter(published=True)
    serializer_class = JournalPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    pagination_class = None


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    pagination_class = None


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None


# --- Form submissions — public create, admin-only read ------------------

class EnquiryViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                     mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAdminUser()]


class NewsletterSubscriberViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                                  viewsets.GenericViewSet):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAdminUser()]

    def perform_create(self, serializer):
        """Save locally, then best-effort push to Mailerlite.

        Mailerlite failures never bubble up — local row is always saved.
        """
        instance = serializer.save()
        _push_to_mailerlite(instance.email)


# --- Site settings — singleton, public read, authenticated write --------

class SiteSettingsView(generics.RetrieveUpdateAPIView):
    """Site-wide configuration (brand, nav, hero, etc.) — a single row."""
    serializer_class = SiteSettingsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        return SiteSettings.load()


# --- Media library — admin-only image uploads --------------------------

class MediaAssetViewSet(viewsets.ModelViewSet):
    """Image upload/list/delete. Multipart uploads via `file`."""
    queryset = MediaAsset.objects.all()
    serializer_class = MediaAssetSerializer
    permission_classes = [IsAdminUser]
    pagination_class = None


# --- Analytics — first-party, anonymous page-view counts ----------------

class PageViewCreateView(generics.CreateAPIView):
    """Public endpoint to record a page view. No auth, no IPs, no cookies."""
    serializer_class = PageViewCreateSerializer
    permission_classes = [AllowAny]


@api_view(["GET"])
@permission_classes([IsAdminUser])
def analytics_summary(request):
    """Aggregate stats for the admin dashboard."""
    from django.db.models import Count
    from django.db.models.functions import TruncDate
    from django.utils import timezone
    from datetime import timedelta

    now = timezone.now()
    last_7 = now - timedelta(days=7)
    last_30 = now - timedelta(days=30)

    qs = PageView.objects
    total = qs.count()
    last7d = qs.filter(created_at__gte=last_7).count()
    last30d = qs.filter(created_at__gte=last_30).count()

    top_paths = list(
        qs.filter(created_at__gte=last_30)
        .values("path")
        .annotate(views=Count("id"))
        .order_by("-views")[:20]
    )

    daily = list(
        qs.filter(created_at__gte=last_30)
        .annotate(date=TruncDate("created_at"))
        .values("date")
        .annotate(views=Count("id"))
        .order_by("date")
    )

    return Response({
        "total": total,
        "last7Days": last7d,
        "last30Days": last30d,
        "topPaths": top_paths,
        "daily": [{"date": str(d["date"]), "views": d["views"]} for d in daily],
    })
