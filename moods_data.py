# moods_data.py

MOODS = [
    {
        "slug": "boldog",
        "name": "Boldog",
        "emoji": "😄",
        "description": "Energia, jókedv, pezsgés.",
        "quote": "„A boldogság nem cél, hanem életforma.”",
        "css_class": "mood-happy"
    },
    {
        "slug": "nyugodt",
        "name": "Nyugodt",
        "emoji": "🌿",
        "description": "Csend, fókusz, belső béke.",
        "quote": "„A csend néha a leghangosabb válasz.”",
        "css_class": "mood-calm"
    },
    {
        "slug": "duhos",
        "name": "Dühös",
        "emoji": "🔥",
        "description": "Intenzív érzelmek, feszültség.",
        "quote": "„Nem az számít, mit érzel, hanem mit kezdesz vele.”",
        "css_class": "mood-angry"
    },
    {
        "slug": "faradt",
        "name": "Fáradt",
        "emoji": "😴",
        "description": "Lassú, alacsony energiájú állapot.",
        "quote": "„Néha a legproduktívabb dolog egyszerűen pihenni.”",
        "css_class": "mood-tired"
    },
    {
        "slug": "motivalt",
        "name": "Motivált",
        "emoji": "⚡",
        "description": "Cél, erő, lendület.",
        "quote": "„A motiváció nem jön magától, csinálni kell.”",
        "css_class": "mood-motivated"
    }
]


def get_mood(slug: str):
    """Helper function: returns mood dict by slug, or None."""
    for mood in MOODS:
        if mood["slug"] == slug:
            return mood
    return None
