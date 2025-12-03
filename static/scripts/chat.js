document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("message");
    const chatBox = document.getElementById("chatbox");

    if (!form || !input || !chatBox) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        addBubble(text, "user");
        input.value = "";
        input.focus();


        const typingBubble = addBubble("Gépelés...", "ai", true);

        try {
            const res = await fetch(window.location.pathname + "/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();
            if (typingBubble) typingBubble.remove();

            if (data.reply) {
                addBubble(data.reply, "ai");
            } else {
                addBubble("Hiba történt a szerveren.", "ai");
            }
        } catch (err) {
            if (typingBubble) typingBubble.remove();
            addBubble("Nem sikerült elküldeni az üzenetet.", "ai");
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