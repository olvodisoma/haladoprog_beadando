
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
        ),
        "avatars": {
            "default": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Boldog&radius=15&backgroundColor=fcbc34&eyes=cute&mouth=smileTeeth",
            "talking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=B_talking&radius=15&backgroundColor=fcbc34&eyes=cute&mouth=smileLol",
            "thinking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=B_thinking&radius=15&backgroundColor=fcbc34&eyes=closed2&mouth=lilSmile"
        }
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
        ),
        "avatars": {
            "default": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Nyugodt&radius=15&backgroundColor=059ff2&eyes=shades&mouth=smileTeeth",
            "talking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Ny_talking&radius=15&backgroundColor=059ff2&eyes=shades&mouth=smileLol",
            "thinking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Ny_thinking&radius=15&backgroundColor=059ff2&eyes=closed2&mouth=plain"
        }
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
        ),
        "avatars": {
            "default": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Duhos&radius=15&backgroundColor=d9915b&eyes=cute&mouth=plain",
            "talking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=D_talking&radius=15&backgroundColor=d9915b&eyes=cute&mouth=shout",
            "thinking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=D_thinking&radius=15&backgroundColor=d9915b&eyes=closed2&mouth=plain"
        }
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
        ),
        "avatars": {
            "default": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Faradt&radius=15&backgroundColor=c0aede&eyes=closed2&mouth=plain,drip",
            "talking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=F_talking&radius=15&backgroundColor=c0aede&eyes=plain&mouth=plain",
            "thinking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=F_thinking&radius=15&backgroundColor=c0aede&eyes=closed2&mouth=plain,drip"
        }
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
        ),
        "avatars": {
            "default": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Motivalt&radius=15&backgroundColor=71cf62&eyes=wink&mouth=cute",
            "talking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=M_talking&radius=15&backgroundColor=71cf62&eyes=closed&mouth=smileLol",
            "thinking": "https://api.dicebear.com/9.x/fun-emoji/svg?seed=M_thinking&radius=15&backgroundColor=71cf62&eyes=closed&mouth=cute"
        }
    },
]


def get_mood(slug: str):
    for mood in MOODS:
        if mood["slug"] == slug:
            return mood
    return None