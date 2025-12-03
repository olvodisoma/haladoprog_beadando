document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("message");
    const chatBox = document.getElementById("chatbox");
    
    const avatarImg = document.getElementById("avatar-image");
    const defaultAvatar = avatarImg ? avatarImg.dataset.default : null;
    const thinkingAvatar = avatarImg ? avatarImg.dataset.thinking : null;
    const talkingAvatar = avatarImg ? avatarImg.dataset.talking : null;

    if (!form || !input || !chatBox) return;

    function setAvatar(state) {
        if (!avatarImg) return;

        let newSrc = defaultAvatar;

        if (state === 'thinking' && thinkingAvatar) {
            newSrc = thinkingAvatar;
        } else if (state === 'talking' && talkingAvatar) {
            newSrc = talkingAvatar;
        }

        if (avatarImg.src === newSrc) return;

        avatarImg.classList.add('switching');

        setTimeout(() => {
            avatarImg.src = newSrc;
            
            avatarImg.onload = () => {
                avatarImg.classList.remove('switching');
            };
            
            setTimeout(() => {
                avatarImg.classList.remove('switching');
            }, 50);

        }, 200);
    }

    if (thinkingAvatar) new Image().src = thinkingAvatar;
    if (talkingAvatar) new Image().src = talkingAvatar;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        addBubble(text, "user");
        input.value = "";
        input.focus();

        setAvatar('thinking');
        const typingBubble = addBubble("...", "ai", true);

        try {
            const res = await fetch(window.location.pathname + "/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();
            
            if (typingBubble) typingBubble.remove();

            if (data.reply) {
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

    async function typeResponse(text) {
        setAvatar('talking');

        const div = document.createElement("div");
        div.classList.add("chat-bubble", "chat-bubble-ai");
        chatBox.appendChild(div);

        for (let i = 0; i < text.length; i++) {
            div.textContent += text.charAt(i);
            chatBox.scrollTop = chatBox.scrollHeight;
            
            await new Promise(resolve => setTimeout(resolve, 30));
        }

        setAvatar('default');
    }

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