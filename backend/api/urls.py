"""API routes."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, auth

router = DefaultRouter()
router.register("practice", views.PracticeViewSet)
router.register("programmes", views.ProgrammeViewSet)
router.register("journal", views.JournalPostViewSet)
router.register("shop", views.ProductViewSet)
router.register("testimonials", views.TestimonialViewSet)
router.register("enquiries", views.EnquiryViewSet)
router.register("newsletter", views.NewsletterSubscriberViewSet)
router.register("media", views.MediaAssetViewSet)

urlpatterns = [
    path("health/", views.health, name="health"),
    path("auth/login/", auth.login_view, name="auth-login"),
    path("auth/logout/", auth.logout_view, name="auth-logout"),
    path("auth/me/", auth.me_view, name="auth-me"),
    path("settings/", views.SiteSettingsView.as_view(), name="settings"),
    path("analytics/pageview/", views.PageViewCreateView.as_view(), name="analytics-pageview"),
    path("analytics/summary/", views.analytics_summary, name="analytics-summary"),
    path("", include(router.urls)),
]
