 document.addEventListener("DOMContentLoaded", () => {
            const body = document.body;
            const cards = document.querySelectorAll(".mood-card");
            const grid = document.querySelector(".mood-grid");

            let activeTheme = "";

            cards.forEach(card => {
                const theme = card.dataset.theme; // pl. "boldog", "nyugodt"...

                card.addEventListener("mouseenter", () => {
                    // előző theme levétele
                    if (activeTheme) {
                        body.classList.remove("theme-" + activeTheme);
                    }
                    // új theme felrakása
                    body.classList.add("theme-" + theme);
                    activeTheme = theme;
                });
            });

            // Ha leviszed az egeret a grid-ről, visszaáll alap háttér
            if (grid) {
                grid.addEventListener("mouseleave", () => {
                    if (activeTheme) {
                        body.classList.remove("theme-" + activeTheme);
                        activeTheme = "";
                    }
                });
            }
        });
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const cards = document.querySelectorAll(".mood-card");
    const grid = document.querySelector(".mood-grid");
    const bgLayer = document.getElementById("bg-layer");

    let activeTheme = "";
    let currentMood = null;
    let particles = [];
    let animationId = null;

    // Hangulat konfigurációk – mozgás stílusa, darabszám
    const moodConfigs = {
        boldog: {
            className: "shape-happy",
            count: 28,
            baseSpeed: 0.08,      // px / frame nagyságrend
            extraY: -0.04         // kicsit felfelé úszik
        },
        nyugodt: {
            className: "shape-calm",
            count: 22,
            baseSpeed: 0.04,
            extraY: 0.02          // lassan lefele sodródik
        },
        duhos: {
            className: "shape-angry",
            count: 24,
            baseSpeed: 0.18,
            extraY: -0.02         // gyorsabb, diagonális
        },
        faradt: {
            className: "shape-tired",
            count: 16,
            baseSpeed: 0.02,
            extraY: 0.01          // szinte csak lebeg
        },
        motivalt: {
            className: "shape-motivated",
            count: 30,
            baseSpeed: 0.12,
            extraY: -0.06         // felfelé törő energia
        }
    };

    function cancelAnimation() {
        if (animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    function clearParticles() {
        cancelAnimation();
        particles.forEach(p => {
            if (p.el && p.el.parentNode) {
                p.el.parentNode.removeChild(p.el);
            }
        });
        particles = [];
    }

    function createParticlesFor(moodSlug) {
        if (!bgLayer) return;
        const config = moodConfigs[moodSlug];
        if (!config) return;

        const width = bgLayer.clientWidth || window.innerWidth;
        const height = bgLayer.clientHeight || window.innerHeight;

        const result = [];

        for (let i = 0; i < config.count; i++) {
            const el = document.createElement("span");
            el.classList.add("bg-shape", config.className);

            const size = 40 + Math.random() * 160;
            el.style.width = size + "px";
            el.style.height = size + "px";

            // Kezdő pozíció véletlen a viewporton belül
            const x = Math.random() * width;
            const y = Math.random() * height;

            // Irányszög az adott hangulathoz
            let angle;
            switch (moodSlug) {
                case "boldog":
                    angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.7; // főleg felfelé
                    break;
                case "nyugodt":
                    angle = Math.PI + (Math.random() - 0.5) * 0.4;      // horizontális drift
                    break;
                case "duhos":
                    angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.6; // diagonális gyors
                    break;
                case "faradt":
                    angle = Math.PI / 2 + (Math.random() - 0.5) * 0.3;  // lassú lefele
                    break;
                case "motivalt":
                    angle = -Math.PI / 3 + (Math.random() - 0.5) * 0.4; // felfelé, dinamikus
                    break;
                default:
                    angle = Math.random() * Math.PI * 2;
            }

            const speedMultiplier = 0.5 + Math.random() * 1.5;
            const speed = config.baseSpeed * speedMultiplier;
            const vx = Math.cos(angle) * speed * 60; // kb. 60fps-re méretezve
            const vy = Math.sin(angle) * speed * 60;

            const scale = 0.7 + Math.random() * 0.9;

            el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
            bgLayer.appendChild(el);

            // azonnali fade-in
            requestAnimationFrame(() => {
                el.classList.add("is-visible");
            });

            result.push({
                x,
                y,
                vx,
                vy,
                scale,
                extraY: config.extraY * 60,
                el
            });
        }

        particles = result;
    }

    function respawnParticle(p, width, height, margin) {
        // amikor kiment a képernyőn túlra, újra beszáll a túloldalról
        // irány alapján eldöntjük, vízszintes vagy függőleges oldalról jöjjön

        const horizontalDominant = Math.abs(p.vx) >= Math.abs(p.vy);

        if (horizontalDominant) {
            // inkább vízszintes mozgás
            if (p.vx > 0) {
                // jobbra ment ki → jöjjön vissza balról
                p.x = -margin;
            } else {
                // balra ment ki → jöjjön vissza jobbról
                p.x = width + margin;
            }
            p.y = Math.random() * height;
        } else {
            // inkább függőleges mozgás
            if (p.vy + p.extraY > 0) {
                // lefele ment ki → jöjjön vissza felülről
                p.y = -margin;
            } else {
                // felfelé ment ki → jöjjön vissza alulról
                p.y = height + margin;
            }
            p.x = Math.random() * width;
        }

        // kint, a képernyőn kívül “spawnol”, és onnan úszik be
    }

    function startAnimationLoop() {
        if (animationId !== null) return; // már fut

        const tick = () => {
            const width = bgLayer.clientWidth || window.innerWidth;
            const height = bgLayer.clientHeight || window.innerHeight;

            const margin = 150; // meddig mehet ki a képernyőn túl

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy + p.extraY;

                const outOfBounds =
                    p.x < -margin ||
                    p.x > width + margin ||
                    p.y < -margin ||
                    p.y > height + margin;

                if (outOfBounds) {
                    // ha kiment, újra spawnoljuk a túloldalon
                    respawnParticle(p, width, height, margin);
                }

                if (p.el) {
                    p.el.style.transform =
                        `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.scale})`;
                }
            });

            animationId = requestAnimationFrame(tick);
        };

        animationId = requestAnimationFrame(tick);
    }

    function setMood(theme) {
        if (!theme) return;
        if (currentMood === theme) return; // ugyanaz, ne csináljunk semmit

        currentMood = theme;

        // Body háttér váltás
        if (activeTheme) {
            body.classList.remove("theme-" + activeTheme);
        }
        body.classList.add("theme-" + theme);
        activeTheme = theme;

        clearParticles();
        createParticlesFor(theme);
        startAnimationLoop();
    }

    cards.forEach(card => {
        const theme = card.dataset.theme; // pl. "boldog"
        card.addEventListener("mouseenter", () => {
            setMood(theme);
        });
    });

    // Ha leviszed az egeret a grid-ről, minden visszaáll
    if (grid) {
        grid.addEventListener("mouseleave", () => {
            currentMood = null;
            if (activeTheme) {
                body.classList.remove("theme-" + activeTheme);
                activeTheme = "";
            }
            clearParticles();
        });
    }
});
const infoSection = document.querySelector(".info");

    if (infoSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        infoSection.classList.add("visible");
                        // ha nem akarod, hogy később eltűnjön, le is kapcsolhatjuk az observert:
                        observer.unobserve(infoSection);
                    }
                });
            },
            {
                threshold: 0.25
            }
        );

        observer.observe(infoSection);
    }