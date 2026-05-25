"""
Content models for the Eunice De Campi site.

List-shaped fields (body paragraphs, palettes, galleries, formats) use
JSONField — the custom React admin renders proper repeatable inputs over them.
Image fields are CharFields holding a URL or media path; dedicated uploads
land with the media-upload task.
"""
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Practice(TimestampedModel):
    """A discipline / service area (Coaching, Interiors, etc.)."""
    slug = models.SlugField(unique=True, max_length=120)
    num = models.CharField(max_length=8, blank=True)
    title = models.CharField(max_length=120)
    discipline = models.CharField(max_length=200, blank=True)
    short = models.TextField(blank=True)
    body = models.JSONField(default=list, blank=True)       # list[str]
    formats = models.JSONField(default=list, blank=True)    # list[{num, label}]
    image = models.CharField(max_length=500, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "num"]
        verbose_name_plural = "Practice"

    def __str__(self):
        return self.title


class Programme(TimestampedModel):
    """A packaged paid offering — coaching programme, retreat-as-product, etc.

    Each programme renders as a dedicated sales page at /programmes/<slug>
    with a problem→transformation→modules structure. Distinct from
    `Practice` (which describes the high-level disciplines) and `Product`
    (one-off items in the shop).
    """
    slug = models.SlugField(unique=True, max_length=160)
    num = models.CharField(max_length=8, blank=True)
    title = models.CharField(max_length=200)
    italic_title = models.CharField(max_length=200, blank=True)
    discipline = models.CharField(max_length=200, blank=True)   # "Coaching · 12 weeks"
    lede = models.TextField(blank=True)

    # Sales-page narrative
    problem = models.JSONField(default=list, blank=True)         # list[str]
    transformation = models.JSONField(default=list, blank=True)  # list[str]
    modules = models.JSONField(default=list, blank=True)         # list[{num, title, body}]
    inclusions = models.JSONField(default=list, blank=True)      # list[{label, detail}]

    # Logistics
    duration = models.CharField(max_length=120, blank=True)      # "Twelve weeks"
    cadence = models.CharField(max_length=120, blank=True)       # "Weekly · 60 min"
    format = models.CharField(max_length=120, blank=True)        # "Private · online or in studio"
    price = models.CharField(max_length=120, blank=True)         # "From £4,800"

    cover = models.CharField(max_length=500, blank=True)
    image_caption = models.CharField(max_length=200, blank=True)

    cta_label = models.CharField(max_length=100, default="Apply to this programme")
    cta_to = models.CharField(max_length=300, default="/enquire?subject=programme")

    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Programme"
        verbose_name_plural = "Programmes"

    def __str__(self):
        return self.title


class JournalPost(TimestampedModel):
    """An editorial journal entry / blog post."""
    slug = models.SlugField(unique=True, max_length=160)
    num = models.CharField(max_length=8, blank=True)
    title = models.CharField(max_length=200)
    deck = models.TextField(blank=True)
    section = models.CharField(max_length=80, blank=True)
    date = models.CharField(max_length=40, blank=True)      # display string e.g. "April 2026"
    read_time = models.CharField(max_length=20, blank=True)
    is_premium = models.BooleanField(default=False)
    cover = models.CharField(max_length=500, blank=True)
    body = models.JSONField(default=list, blank=True)       # list[str]
    published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class Product(TimestampedModel):
    """A shop product (printed or digital edition)."""
    slug = models.SlugField(unique=True, max_length=120)
    num = models.CharField(max_length=8, blank=True)
    name = models.CharField(max_length=160)
    italic_title = models.CharField(max_length=80, blank=True)
    subtitle = models.CharField(max_length=200, blank=True)
    series = models.CharField(max_length=120, blank=True)
    edition = models.CharField(max_length=80, blank=True)
    stamp = models.CharField(max_length=16, blank=True)
    format = models.CharField(max_length=80, blank=True)
    pages = models.CharField(max_length=40, blank=True)
    binding = models.CharField(max_length=120, blank=True)
    kind = models.CharField(max_length=160, blank=True)
    price = models.CharField(max_length=20, blank=True)
    tone = models.CharField(max_length=20, blank=True)
    cover = models.CharField(max_length=500, blank=True)
    blurb = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "num"]

    def __str__(self):
        return self.name


class Testimonial(TimestampedModel):
    """A client / member testimonial."""
    quote = models.TextField()
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=160, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class Enquiry(TimestampedModel):
    """A submission from the public enquiry form."""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    interest = models.CharField(max_length=80, blank=True)
    budget = models.CharField(max_length=80, blank=True)
    note = models.TextField(blank=True)
    handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Enquiries"

    def __str__(self):
        return f"{self.name} — {self.created_at:%Y-%m-%d}"


class NewsletterSubscriber(TimestampedModel):
    """An email-list signup."""
    email = models.EmailField(unique=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.email


class SiteSettings(models.Model):
    """Site-wide configuration — a single editable row (pk=1).

    Stored as JSON blobs (brand, nav, hero, etc.); the React admin renders
    structured editors over them. Use SiteSettings.load() to read/create it.
    """
    brand = models.JSONField(default=dict, blank=True)
    nav = models.JSONField(default=list, blank=True)
    hero = models.JSONField(default=dict, blank=True)
    studio = models.JSONField(default=dict, blank=True)
    membership = models.JSONField(default=dict, blank=True)
    contact = models.JSONField(default=dict, blank=True)
    notification = models.JSONField(default=dict, blank=True)
    # Phase 3 content blocks
    about = models.JSONField(default=dict, blank=True)
    speaking = models.JSONField(default=dict, blank=True)
    retreats = models.JSONField(default=dict, blank=True)
    legal = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site settings"
        verbose_name_plural = "Site settings"

    def __str__(self):
        return "Site settings"

    def save(self, *args, **kwargs):
        self.pk = 1  # enforce singleton
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class MediaAsset(TimestampedModel):
    """An uploaded image. Served from MEDIA_URL."""
    file = models.ImageField(upload_to="uploads/")
    label = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.label or self.file.name


class PageView(models.Model):
    """Anonymous page-view record — no IPs, no cookies, no PII."""
    path = models.CharField(max_length=500)
    referrer = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["path", "created_at"])]

    def __str__(self):
        return f"{self.path} @ {self.created_at:%Y-%m-%d %H:%M}"
