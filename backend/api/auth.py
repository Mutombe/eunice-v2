"""Token-based authentication for the studio admin.

The decoupled React admin logs in here, stores the returned token, and sends
it as `Authorization: Token <key>` on subsequent requests.
"""
from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

User = get_user_model()


def _user_payload(user):
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "name": user.get_full_name() or user.username,
        "isStaff": user.is_staff,
    }


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """Log in with username or email + password. Returns an auth token."""
    identifier = (request.data.get("username") or "").strip()
    password = request.data.get("password") or ""

    user = authenticate(username=identifier, password=password)
    # Allow logging in with an email address too.
    if user is None and "@" in identifier:
        match = User.objects.filter(email__iexact=identifier).first()
        if match:
            user = authenticate(username=match.username, password=password)

    if user is None or not user.is_active:
        return Response(
            {"detail": "Invalid credentials."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    if not user.is_staff:
        return Response(
            {"detail": "This account cannot access the studio admin."},
            status=status.HTTP_403_FORBIDDEN,
        )

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "user": _user_payload(user)})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Invalidate the caller's token."""
    Token.objects.filter(user=request.user).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    """Return the authenticated user — used to validate a stored token."""
    return Response({"user": _user_payload(request.user)})
