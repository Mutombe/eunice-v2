"""Two cleanups after the initial blog migration (29-30 May):

  1. Replace the curated Unsplash covers on the 11 migrated posts with
     Eunice's actual cover images from 'blog images/'. Uploads each to
     DigitalOcean Spaces (already configured) under blog/.
  2. Delete the 5 originally-seeded literary posts that were not from her
     (slugs: second-season, the-room-as-a-collaborator,
     inner-architecture, quiet-report-q1, letters-to-women-rebuilding).

Idempotent — uploads are overwritten if rerun; deletes are no-ops if the
posts have already been removed.

Run from backend/:
    .venv/Scripts/python.exe fix_blogs.py
"""
import os
import re
from pathlib import Path
from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parent
REPO_ROOT = BACKEND_DIR.parent
BLOG_IMG_DIR = REPO_ROOT / "blog images"

load_dotenv(BACKEND_DIR / ".env", override=True)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
import django; django.setup()

from api.models import JournalPost
from django.conf import settings
import boto3
from botocore.client import Config


# === Map image filename → blog slug ===
# Matching by the distinctive title keywords in the filename.
IMG_TO_SLUG = {
    "NAVIGATE UNEXPECTED LIFE CHANGES.jpg":                                 "navigate-unexpected-life-changes",
    "HOW TO NAVIGATE THE LIFE YOU DID NOT PLAN.jpg":                        "navigate-life-you-did-not-plan",
    "HOW GRIEF ACTUALLY WORKS YOU’RE NOT BACK AT SQUARE ONE.jpg":      "how-grief-actually-works",
    "THE ART OF RESILIENCE How to Rebuild Strength, Meaning,.jpg":          "the-art-of-resilience",
    "AN UNEXPECTED OUTCOME IN LIFE.jpg":                                    "unexpected-outcome-in-life",
    "THE VOID PHASE, WHY YOU FEEL STUCK, LOST AND.jpeg":                    "the-void-phase",
    "SHIFTING YOUR MINDSET FOR ABUNDANCE.jpg":                              "shifting-your-mindset-for-abundance",
    "REDEFINING YOUR PURPOSE AFTER A MAJOR LIFE.jpg":                       "redefining-your-purpose-after-major-life-change",
    "WHEN LIFE BREAKS OPEN (Part 2) THE QUIET.webp":                        "when-life-breaks-open-quiet-rebuilding",
    "WHEN LIFE BREAKS OPEN, THE SEASON THAT.jpg":                           "when-life-breaks-open-redefines-everything",
    "WHY EMOTIONAL STRENGTH IS THE FOUNDATION OF LIFE.jpg":                 "emotional-strength-foundation-of-life-management",
}

# === Slugs to delete (originally seeded literary posts, not from Eunice) ===
DELETE_SLUGS = [
    "second-season",
    "the-room-as-a-collaborator",
    "inner-architecture",
    "quiet-report-q1",
    "letters-to-women-rebuilding",
]


def slugify_filename(name):
    """blog/<safe-name>.<ext> — strip apostrophes/commas, lowercase, dashes."""
    stem, ext = os.path.splitext(name)
    safe = re.sub(r"[^a-zA-Z0-9]+", "-", stem).strip("-").lower()
    return f"blog/{safe}{ext.lower()}"


def upload(client, bucket, src_path, key):
    """Upload one file with public-read ACL and a sensible content-type."""
    import mimetypes
    ctype, _ = mimetypes.guess_type(src_path)
    extra = {
        "ACL": "public-read",
        "ContentType": ctype or "image/jpeg",
        "CacheControl": "max-age=86400",
    }
    client.upload_file(str(src_path), bucket, key, ExtraArgs=extra)
    return f"{settings.AWS_S3_ENDPOINT_URL}/{bucket}/{key}"


# === Run ===
print(f"Source dir:     {BLOG_IMG_DIR}")
print(f"DO Spaces:      {settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_STORAGE_BUCKET_NAME}/blog/")
print()

# Build a boto3 client for DO Spaces
session = boto3.session.Session()
client = session.client(
    "s3",
    region_name=settings.AWS_S3_REGION_NAME,
    endpoint_url=settings.AWS_S3_ENDPOINT_URL,
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    config=Config(signature_version="s3v4"),
)

# Upload covers + update DB
print("=== Uploading covers + swapping URLs ===")
swapped = missing = 0
for filename, slug in IMG_TO_SLUG.items():
    src = BLOG_IMG_DIR / filename
    if not src.exists():
        print(f"  ! missing source: {filename}")
        missing += 1
        continue
    key = slugify_filename(filename)
    url = upload(client, settings.AWS_STORAGE_BUCKET_NAME, src, key)
    qs = JournalPost.objects.filter(slug=slug)
    if not qs.exists():
        print(f"  ! no JournalPost for slug={slug}")
        continue
    qs.update(cover=url)
    print(f"  ✓ {slug:55} → {url[44:]}")
    swapped += 1

print(f"\n  {swapped} covers swapped, {missing} source files missing\n")

# Delete the original seeded posts
print("=== Deleting originally-seeded literary posts ===")
total_deleted = 0
for slug in DELETE_SLUGS:
    deleted, _ = JournalPost.objects.filter(slug=slug).delete()
    if deleted:
        print(f"  ✓ deleted {slug}")
        total_deleted += deleted
    else:
        print(f"  · not present {slug}")

print(f"\n  {total_deleted} posts deleted")
print(f"\n  Total posts now: {JournalPost.objects.count()}")
for p in JournalPost.objects.order_by("num").values_list("num", "title"):
    print(f"    {p[0]} {p[1][:65]}")
