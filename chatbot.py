# chatbot.py
import os
import time
import random
from huggingface_hub import InferenceClient

HF_TOKEN = "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"
if HF_TOKEN is None:
    raise RuntimeError("HF_TOKEN nincs beállítva! PowerShell: setx HF_TOKEN \"A_TOKEND\"")

# ⭐ 100% működő, CHAT-kompatibilis modell:
MODEL_NAME = "google/gemma-2-9b-it"

hf_client = InferenceClient(
    model=MODEL_NAME,
    token=HF_TOKEN
)

BASE_SYSTEM_PROMPT = (
    "Beszélj természetes, folyékony magyar nyelven. "
    "Egy társalgó AI vagy – nem feladatmegoldó, nem programozó, nem oktató. "
    "Barátságosan, emberien reagálj. "
    "Ne használj túldramatizált vagy mesterkélt mondatokat. "
    "A beszélgetés hangulata a persona alapján változik, de maradj természetes."
)


class ChatbotSession:
    def __init__(self, persona: str):
        # A rendszerprompt + persona együtt
        self.history = [
            {"role": "system", "content": BASE_SYSTEM_PROMPT + "\n\nSzemélyiséged:\n" + persona}
        ]

    def ask(self, user_message: str) -> str:
        # 1. Először hozzáadjuk a felhasználó üzenetét a history-hoz
        self.history.append({"role": "user", "content": user_message})

        # 2. ITT A KÉSLELTETÉS
        # Véletlenszerűen vár 2 és 4 másodperc között.
        # Ez alatt a frontend a "thinking" avatárt fogja mutatni,
        # mert még nem érkezett meg a válasz.
        time.sleep(random.uniform(2.0, 5.0))

        # 3. Csak a késleltetés után hívjuk meg az AI-t
        response = hf_client.chat.completions.create(
            model=MODEL_NAME,
            messages=self.history,
            max_tokens=300,
            temperature=0.7
        )

        msg = response.choices[0].message
        content = msg["content"] if isinstance(msg, dict) else msg.content
        content = content.strip()

        self.history.append({"role": "assistant", "content": content})

        return content
    