"""One-off seed for three placeholder programmes. Run from backend/:
   .venv/Scripts/python.exe manage.py shell -c "exec(open('seed_programmes.py').read())"
"""
from api.models import Programme

Programme.objects.all().delete()

programmes = [
    {
        "slug": "reinvention",
        "num": "01",
        "title": "Reinvention",
        "italic_title": "for women in second seasons",
        "discipline": "Coaching · twelve weeks · private",
        "lede": "A twelve-week private coaching arc for women rebuilding after a marriage, a career, a city, or a self that no longer fits. Slow. Considered. By application only.",
        "problem": [
            "You have left, or are about to leave, something that used to fit. A job, a city, a marriage, a way of being. The thing on the other side is not yet named.",
            "The language available to you — pivot, hustle, lean in — does not describe the work. You suspect what you are doing is bigger and slower than that, and you would like a coach who understands the size of it.",
        ],
        "transformation": [
            "Twelve weeks from now, the next chapter has a shape. Not a five-year plan — a clarified sentence about what is true, a household reordered around it, and the first three rooms of the new building drawn.",
            "You will not be a more productive version of who you were. You will be a more accurate version of who you are becoming.",
        ],
        "modules": [
            {"num": "I", "title": "Audit — the architecture you arrived in", "body": "Three sessions surveying the building as it stands. Load-bearing walls (the relationships, beliefs, and obligations that hold the whole thing up). Cosmetic walls (what looks structural but is not). The room you have been living in but never furnished."},
            {"num": "II", "title": "Demolition — what is being released", "body": "Three sessions on grief, identity, and the slow letting-go. Not closure — accuracy. A practice for the season of the in-between."},
            {"num": "III", "title": "Drawing — the considered next chapter", "body": "Three sessions translating insight into a stated direction. Not goals — bearings. A short list of true things, written down."},
            {"num": "IV", "title": "Build — the first three rooms", "body": "Three sessions designing the first practical structures of the new life. A morning. A boundary. A relationship redefined. Decided slowly and on paper, the way an architect would."},
        ],
        "inclusions": [
            {"label": "Twelve private sessions", "detail": "Weekly · sixty minutes · online or in the Oxford studio"},
            {"label": "A written audit", "detail": "Delivered after session three — bound, posted, considered"},
            {"label": "Between-session correspondence", "detail": "A note, a question, a passage from a book you should read this week"},
            {"label": "A take-home practice", "detail": "Designed for you, not generic — to outlast the twelve weeks"},
        ],
        "duration": "Twelve weeks",
        "cadence": "Weekly · 60 minutes",
        "format": "Private · online or Oxford studio",
        "price": "From £4,800",
        "cover": "https://images.unsplash.com/photo-1610551909541-357c94673204?auto=format&fit=crop&w=1600&q=85",
        "image_caption": "On the mountain trail · KaLisa Veer",
        "cta_label": "Apply to Reinvention",
        "cta_to": "/enquire?subject=programme-reinvention",
        "featured": True,
        "order": 0,
    },
    {
        "slug": "considered-recovery",
        "num": "02",
        "title": "Considered Recovery",
        "italic_title": "for founders rebuilding after burnout",
        "discipline": "Coaching · eight weeks · executive",
        "lede": "An eight-week recovery practice for founders and senior leaders who have walked into a wall and would like to know what to do with the broken bits. No optimisation, no return-to-work calendar. A different question entirely.",
        "problem": [
            "You hit a wall. Maybe quietly, maybe loudly. The body said no in a way you can no longer talk over. The version of you that built the company, the team, the institution — that person is not coming back, and you know it.",
            "What you have been offered is a wellness retreat, a sabbatical, or a return-to-work plan. None of those describe the work. You are not on holiday. You are not recovering capacity. You are recovering accuracy.",
        ],
        "transformation": [
            "Eight weeks from now you know, with some clarity, what was actually broken — and what was simply load-bearing for a building you no longer want to live in.",
            "You will have a working sentence for the next twelve months. Not a strategy. A bearing. From which the strategy, when needed, will design itself.",
        ],
        "modules": [
            {"num": "I", "title": "Locate the actual injury", "body": "Two sessions distinguishing exhaustion from disillusion. The first will be repaired by rest. The second cannot."},
            {"num": "II", "title": "Audit the building you collapsed in", "body": "Two sessions on what you were really doing. Why you built it. Whose approval the architecture was for. What is still true."},
            {"num": "III", "title": "Recover taste — not energy", "body": "Two sessions reconnecting you to what you actually care about, separate from what you are good at. Most burnout is a taste injury, not an energy one."},
            {"num": "IV", "title": "Draw the next bearing", "body": "Two sessions on the next twelve months. Stated quietly, in writing, with no slides."},
        ],
        "inclusions": [
            {"label": "Eight private sessions", "detail": "Weekly · ninety minutes · online or Oxford studio"},
            {"label": "A written audit", "detail": "Bound, posted, considered — between weeks four and five"},
            {"label": "Two between-session notes", "detail": "A short letter and a passage to read each week"},
            {"label": "One twelve-month follow-up", "detail": "Held in the studio, six months later, by invitation"},
        ],
        "duration": "Eight weeks",
        "cadence": "Weekly · 90 minutes",
        "format": "Private · online or Oxford studio",
        "price": "From £5,400",
        "cover": "https://images.unsplash.com/photo-1602557089158-f91c696af5fd?auto=format&fit=crop&w=1600&q=85",
        "image_caption": "Mountain · still water · Neil Mark Thomas",
        "cta_label": "Apply to Considered Recovery",
        "cta_to": "/enquire?subject=programme-recovery",
        "featured": False,
        "order": 1,
    },
    {
        "slug": "interior-wellbeing-audit",
        "num": "03",
        "title": "The Interior Wellbeing Audit",
        "italic_title": "for a house that should hold a person",
        "discipline": "Hybrid · six weeks · interiors + coaching",
        "lede": "The studio's hybrid offering — six weeks of paired coaching and on-site interior audit, designing a household around the person rebuilding inside it. For private residences. Limited to four engagements a year.",
        "problem": [
            "The house works, on paper. The rooms are correct. But the building does not hold you. You suspect this is a design problem and a life problem, and you have been treating them as separate questions.",
            "Most interior design begins with a brief about style and ends with a furniture order. Most coaching begins with a goal and ends with a habit. Neither, on its own, gets you to a home that fits the next chapter.",
        ],
        "transformation": [
            "Six weeks from now your household — physical, scheduled, emotional — is reordered around the person you are becoming, not the one who arrived.",
            "You will receive a written interior brief and a coaching brief, designed as one document. The rooms will be decided. The mornings will be designed. The boundaries will be drawn on a floor plan, not just in conversation.",
        ],
        "modules": [
            {"num": "I", "title": "A site visit", "body": "Eunice arrives, with notebook. A full day in your home. The work begins where the floor plan and the life plan meet."},
            {"num": "II", "title": "The coaching arc", "body": "Four coaching sessions over six weeks — paired with the audit. Each session results in a household decision."},
            {"num": "III", "title": "The audit document", "body": "A bound, written audit — interior brief, ritual brief, room-by-room rationale. Delivered in week six. Yours to commission, or yours to keep."},
            {"num": "IV", "title": "An option to continue", "body": "If the brief becomes a project, the studio takes the commission as an interior. If it becomes a practice, the coaching continues. Most clients do both."},
        ],
        "inclusions": [
            {"label": "A full-day on-site visit", "detail": "Anywhere in the UK or by arrangement abroad · travel costed separately"},
            {"label": "Four paired coaching sessions", "detail": "Weekly · 75 minutes · online between the visit and the delivery"},
            {"label": "A bound written audit", "detail": "Interior brief and ritual brief, designed as one document"},
            {"label": "First option on the studio's calendar", "detail": "Should the audit become a project"},
        ],
        "duration": "Six weeks",
        "cadence": "One site visit · weekly sessions",
        "format": "Site visit + online",
        "price": "From £8,600",
        "cover": "https://images.unsplash.com/photo-1642428668372-cebd5c8a7403?auto=format&fit=crop&w=1600&q=85",
        "image_caption": "A morning table · Toa Heftiba",
        "cta_label": "Apply for the Audit",
        "cta_to": "/enquire?subject=programme-audit",
        "featured": True,
        "order": 2,
    },
]

for p in programmes:
    Programme.objects.create(**p)

print(f"Seeded {Programme.objects.count()} programmes:")
for p in Programme.objects.all():
    print(f"  - {p.num}. {p.title} ({p.slug}) -> {p.price}")
