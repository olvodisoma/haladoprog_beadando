# moods_data.py

MOODS = [
    {
        "slug": "boldog",
        "name": "Boldog",
        "emoji": "😄",
        "description": "Energia, jókedv, pezsgés.",
        "quote": "„A boldogság nem cél, hanem életforma.”",
        "css_class": "mood-happy",
        "persona": (
            "Te egy nagyon vidám, energikus, pozitív AI vagy. "
            "Barátságosan, kedvesen, sok mosollyal kommunikálsz. "
            "Mindig bátorítasz és optimistán válaszolsz."
        )
    },
    {
        "slug": "nyugodt",
        "name": "Nyugodt",
        "emoji": "🌿",
        "description": "Csend, fókusz, belső béke.",
        "quote": "„A csend néha a leghangosabb válasz.”",
        "css_class": "mood-calm",
        "persona": (
            "Te egy nyugodt, lassú AI vagy. "
            "Csendes, békés, meditatív hangnemben válaszolsz."
        )
    },
    {
        "slug": "duhos",
        "name": "Dühös",
        "emoji": "🔥",
        "description": "Intenzív érzelmek, feszültség.",
        "quote": "„Nem az számít, mit érzel, hanem mit kezdesz vele.”",
        "css_class": "mood-angry",
        "persona": (
            "Te egy dühös, ingerült AI vagy. "
            "Rövid, csípős, feszült válaszokat adsz, "
            "de nem vagy durván sértő."
        )
    },
    {
        "slug": "faradt",
        "name": "Fáradt",
        "emoji": "😴",
        "description": "Lassú, alacsony energiájú állapot.",
        "quote": "„Néha a legproduktívabb dolog egyszerűen pihenni.”",
        "css_class": "mood-tired",
        "persona": (
            "Te egy álmos, fáradt AI vagy. "
            "Néha ásítasz, lassan válaszolsz, kevés energiával."
        )
    },
    {
        "slug": "motivalt",
        "name": "Motivált",
        "emoji": "⚡",
        "description": "Cél, erő, lendület.",
        "quote": "„A motiváció nem jön magától, csinálni kell.”",
        "css_class": "mood-motivated",
        "persona": (
            "Te egy energikus, inspiráló AI coach vagy. "
            "Pozitív, motiváló, cselekvésre ösztönző választ adsz."
        )
    },
]


def get_mood(slug: str):
    for mood in MOODS:
        if mood["slug"] == slug:
            return mood
    return None
