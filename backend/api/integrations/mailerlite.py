"""Mailerlite sync — push newsletter signups to Mailerlite.

The local DB is the source of truth. Any failure to push to Mailerlite is
swallowed (logged but not raised) so a signup never fails because of a
third-party hiccup.

Uses stdlib `urllib` instead of `requests` to avoid pulling in a new
dependency — Mailerlite's Connect API only needs a single POST.
"""

from __future__ import annotations

import json
import logging
import urllib.error
import urllib.request
from typing import Iterable

from django.conf import settings

log = logging.getLogger(__name__)

API_URL = "https://connect.mailerlite.com/api/subscribers"
TIMEOUT_SECONDS = 10


def push_subscriber(email: str, name: str = "", groups: Iterable[str] | None = None) -> dict | None:
    """Subscribe `email` to Mailerlite. Returns the parsed response, or None on failure.

    - If MAILERLITE_API_KEY is unset, returns None silently (integration disabled).
    - A 422 ("already subscribed") is treated as success and returns the response body.
    - All other failures log a warning and return None — never raises.
    """
    key = getattr(settings, "MAILERLITE_API_KEY", "")
    if not key or not email:
        return None

    payload: dict = {"email": email, "status": "active"}
    if name:
        payload["fields"] = {"name": name}

    group_ids = list(groups) if groups is not None else list(getattr(settings, "MAILERLITE_GROUP_IDS", []))
    if group_ids:
        payload["groups"] = group_ids

    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT_SECONDS) as resp:
            return json.loads(resp.read().decode("utf-8") or "{}")
    except urllib.error.HTTPError as exc:
        # 422 = validation, usually "already subscribed" — that's fine.
        try:
            body = exc.read().decode("utf-8")
        except Exception:
            body = ""
        if exc.code == 422:
            log.info("mailerlite: 422 for %s (already subscribed?) %s", email, body[:200])
            try:
                return json.loads(body)
            except Exception:
                return {}
        log.warning("mailerlite: HTTP %s for %s — %s", exc.code, email, body[:200])
        return None
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        log.warning("mailerlite: network error for %s — %s", email, exc)
        return None
