document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------
    // 1. ELEMEK ÉS AVATÁR CONFIG
    // ------------------------------------------
    const form = document.getElementById("chat-form");
    const input = document.getElementById("message");
    const chatBox = document.getElementById("chatbox");
    
    // Avatár kép és URL-ek betöltése
    const avatarImg = document.getElementById("avatar-image");
    const defaultAvatar = avatarImg ? avatarImg.dataset.default : null;
    const thinkingAvatar = avatarImg ? avatarImg.dataset.thinking : null;
    const talkingAvatar = avatarImg ? avatarImg.dataset.talking : null;

    if (!form || !input || !chatBox) return;

    // Segédfüggvény: Avatár cseréje
    // Segédfüggvény: Avatár cseréje animációval
    function setAvatar(state) {
        if (!avatarImg) return;

        let newSrc = defaultAvatar;

        if (state === 'thinking' && thinkingAvatar) {
            newSrc = thinkingAvatar;
        } else if (state === 'talking' && talkingAvatar) {
            newSrc = talkingAvatar;
        }

        // Ha ugyanaz a kép, ne csináljon semmit (ne villogjon feleslegesen)
        if (avatarImg.src === newSrc) return;

        // 1. ELTÜNTETÉS (Fade out)
        avatarImg.classList.add('switching');

        // Várunk 200ms-t (amíg a CSS transition lefut), majd csere
        setTimeout(() => {
            avatarImg.src = newSrc;
            
            // Amikor betöltődött az új kép, akkor jelenítjük meg újra
            // (Ez megakadályozza, hogy üres keret jelenjen meg, ha lassú a net)
            avatarImg.onload = () => {
                avatarImg.classList.remove('switching');
            };
            
            // Biztonsági tartalék: ha már cache-ben van, az onload nem mindig fut le gyorsan,
            // ezért egy kis timeout után mindenképp visszahozzuk.
            setTimeout(() => {
                avatarImg.classList.remove('switching');
            }, 50);

        }, 200); // Ez az idő (200ms) egyezzen meg a CSS transition idejével
    }

    // EXTRA: Képek előtöltése (Preloading)
    // Ezt másold be a setAvatar függvény UTÁ, de még a DOMContentLoaded-en belülre.
    // Ez biztosítja, hogy a böngésző már letöltse a képeket, mire használni kell őket.
    if (thinkingAvatar) new Image().src = thinkingAvatar;
    if (talkingAvatar) new Image().src = talkingAvatar;

    // ------------------------------------------
    // 2. ÜZENETKÜLDÉS ÉS LOGIKA
    // ------------------------------------------
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        // Felhasználó üzenete azonnal
        addBubble(text, "user");
        input.value = "";
        input.focus();

        // AVATAR: Gondolkodás bekapcsolása (Thinking)
        setAvatar('thinking');

        // Opcionális: "Gépelés..." buborék, amíg a szerver gondolkodik
        const typingBubble = addBubble("...", "ai", true);

        try {
            const res = await fetch(window.location.pathname + "/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();
            
            // "..." buborék eltávolítása, mert jön az igazi válasz
            if (typingBubble) typingBubble.remove();

            if (data.reply) {
                // A sima addBubble helyett a "Gépelős" effektet hívjuk
                await typeResponse(data.reply);
            } else {
                addBubble("Hiba történt a szerveren.", "ai");
                setAvatar('default');
            }
        } catch (err) {
            if (typingBubble) typingBubble.remove();
            addBubble("Nem sikerült elküldeni az üzenetet.", "ai");
            setAvatar('default');
            console.error(err);
        }
    });

    // Sima buborék hozzáadó (Usernek és hibaüzeneteknek)
    function addBubble(text, type, isTyping = false) {
        const div = document.createElement("div");
        div.classList.add("chat-bubble");
        if (type === "user") {
            div.classList.add("chat-bubble-user");
        } else {
            div.classList.add("chat-bubble-ai");
        }

        div.textContent = text;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;

        return isTyping ? div : null;
    }

    // ÚJ: Gépelős effekt az AI válaszhoz (hogy látszódjon a Talking avatár)
    async function typeResponse(text) {
        // AVATAR: Beszéd bekapcsolása (Talking)
        setAvatar('talking');

        const div = document.createElement("div");
        div.classList.add("chat-bubble", "chat-bubble-ai");
        chatBox.appendChild(div);

        // Betűnkénti kiírás
        for (let i = 0; i < text.length; i++) {
            div.textContent += text.charAt(i);
            chatBox.scrollTop = chatBox.scrollHeight;
            
            // Kis késleltetés a betűk között (gyorsabb vagy lassabb gépelésért állítsd a számot)
            await new Promise(resolve => setTimeout(resolve, 30));
        }

        // AVATAR: Vissza alapállapotba (Default)
        setAvatar('default');
    }

    // ================================
    // 3. HÁTTÉR ANIMÁCIÓ (RÉGI KÓD)
    // ================================

    const bg = document.getElementById("bg-layer");
    const moodSlug = document.body.dataset.mood || "nyugodt"; 

    const moodToClass = {
        boldog: "shape-happy",
        nyugodt: "shape-calm",
        duhos: "shape-angry",
        faradt: "shape-tired",
        motivalt: "shape-motivated",
    };

    const shapeClass = moodToClass[moodSlug];

    if (bg && shapeClass) {
        function spawnSlowShape() {
            const shape = document.createElement("div");
            shape.classList.add("bg-shape", shapeClass);

            const size = Math.random() * 160 + 90; 
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;

            shape.style.left = Math.random() * 100 + "vw";
            shape.style.top  = Math.random() * 100 + "vh";

            shape.style.setProperty("--movex", (Math.random() - 0.5) * 240 + "px");
            shape.style.setProperty("--movey", (Math.random() - 0.5) * 240 + "px");

            bg.appendChild(shape);
        }

        const count = 12; 
        for (let i = 0; i < count; i++) {
            spawnSlowShape();
        }
    }
});