/* =====================================================
   ALCOCOA
   JAVASCRIPT PRINCIPAL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navbar = document.getElementById("navbar");

    const dropdowns = document.querySelectorAll(".dropdown");


    if (mobileMenuBtn && navbar) {

        mobileMenuBtn.addEventListener("click", function () {

            navbar.classList.toggle("active");

            const icon = mobileMenuBtn.querySelector("i");

            if (navbar.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    /* =====================================================
       DROPDOWNS MOBILE
    ===================================================== */

    dropdowns.forEach(function (dropdown) {

        const toggle = dropdown.querySelector(".dropdown-toggle");

        if (!toggle) return;

        toggle.addEventListener("click", function (event) {

            if (window.innerWidth <= 850) {

                event.preventDefault();

                dropdown.classList.toggle("active");

            }

        });

    });


    /* =====================================================
       FERMER LE MENU MOBILE APRÈS UN CLIC
    ===================================================== */

    const menuLinks = document.querySelectorAll(
        ".dropdown-menu a, .products-mega-menu a, .nav-menu > .nav-item:not(.dropdown) > a"
    );


    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 850 && navbar) {

                navbar.classList.remove("active");

                const icon = mobileMenuBtn?.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    });


    /* =====================================================
   LE VOYAGE DU CACAO
   STORYTELLING AU SCROLL
===================================================== */

const journeySection =
    document.querySelector(".cocoa-journey");

const journeySlider =
    document.querySelector(".journey-slider");

const journeySteps =
    document.querySelectorAll(".journey-step");

const progressBar =
    document.querySelector(".journey-progress-bar");


if (
    journeySection &&
    journeySlider &&
    journeySteps.length
) {

    let currentStep = 0;

    let isChanging = false;


    /* =================================================
       AFFICHER UNE ÉTAPE
    ================================================= */

    function showStep(index) {

        if (index < 0) {
            index = 0;
        }

        if (index >= journeySteps.length) {
            index = journeySteps.length - 1;
        }


        currentStep = index;


        journeySteps.forEach(function (step, i) {

            step.classList.toggle(
                "active",
                i === currentStep
            );

        });


        /* Barre de progression */

        if (progressBar) {

            const percentage =
                ((currentStep + 1) /
                journeySteps.length) * 100;

            progressBar.style.width =
                percentage + "%";
        }

    }


    /* =================================================
       SAVOIR SI LE PARCOURS EST À L'ÉCRAN
    ================================================= */

    function isJourneyActive() {

        const rect =
            journeySlider.getBoundingClientRect();


        /*
         * Le slider est considéré actif lorsqu'il
         * occupe réellement l'écran.
         */

        return (
            rect.top <= 100 &&
            rect.bottom >= window.innerHeight - 50
        );

    }


    /* =================================================
       MOLETTE SOURIS / TRACKPAD
    ================================================= */

    window.addEventListener(
        "wheel",
        function (event) {

            /*
             * Si le parcours n'est pas encore à l'écran,
             * on laisse le scroll normal fonctionner.
             */

            if (!isJourneyActive()) {
                return;
            }


            /*
             * DÉFILEMENT VERS LE BAS
             */

            if (event.deltaY > 0) {

                /*
                 * Il reste des étapes :
                 * on bloque le scroll normal et on passe
                 * à l'étape suivante.
                 */

                if (
                    currentStep <
                    journeySteps.length - 1
                ) {

                    event.preventDefault();


                    if (isChanging) {
                        return;
                    }


                    isChanging = true;


                    showStep(
                        currentStep + 1
                    );


                    /*
                     * Petit délai pour éviter que
                     * plusieurs événements de molette
                     * changent 3 ou 4 étapes d'un coup.
                     */

                    setTimeout(function () {

                        isChanging = false;

                    }, 500);

                }

                /*
                 * Si nous sommes à la dernière étape,
                 * on NE bloque PAS le scroll.
                 *
                 * Le visiteur peut donc sortir
                 * naturellement de la section.
                 */

            }


            /* =================================================
               DÉFILEMENT VERS LE HAUT
            ================================================= */

            else if (event.deltaY < 0) {

                /*
                 * Si on est au-dessus de la première étape,
                 * le scroll normal fonctionne.
                 */

                if (currentStep > 0) {

                    event.preventDefault();


                    if (isChanging) {
                        return;
                    }


                    isChanging = true;


                    showStep(
                        currentStep - 1
                    );


                    setTimeout(function () {

                        isChanging = false;

                    }, 500);

                }

            }

        },
        {
            passive: false
        }
    );


    /* =================================================
       INITIALISATION
    ================================================= */

    showStep(0);

}

    /* =====================================================
       REDIMENSIONNEMENT GLOBAL
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 850) {

            if (navbar) {

                navbar.classList.remove("active");

            }


            dropdowns.forEach(function (dropdown) {

                dropdown.classList.remove("active");

            });


            const icon =
                mobileMenuBtn?.querySelector("i");


            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        }

    });

});

/* =====================================================
   MENU FIXE + EFFET AU SCROLL
===================================================== */

const header = document.querySelector(".site-header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* =====================================================
   CHATBOT ALCOCOA
===================================================== */

const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");
const chatbotMessages = document.getElementById("chatbotMessages");
const quickActions = document.querySelectorAll(".chatbot-quick-actions button");


/* OUVRIR */

if (chatbotToggle) {
    chatbotToggle.addEventListener("click", () => {
        chatbotWindow.classList.toggle("active");

        if (chatbotWindow.classList.contains("active")) {
            chatbotInput.focus();
        }
    });
}


/* FERMER */

if (chatbotClose) {
    chatbotClose.addEventListener("click", () => {
        chatbotWindow.classList.remove("active");
    });
}


/* AJOUTER UN MESSAGE */

function addChatMessage(message, type = "bot") {

    const messageElement = document.createElement("div");

    messageElement.className =
        `chatbot-message ${type}`;

    if (type === "bot") {

        messageElement.innerHTML = `
            <div class="message-avatar">A</div>

            <div class="message-bubble">
                ${message}
            </div>
        `;

    } else {

        messageElement.innerHTML = `
            <div class="message-bubble">
                ${message}
            </div>
        `;

    }

    chatbotMessages.appendChild(messageElement);

    chatbotMessages.scrollTop =
        chatbotMessages.scrollHeight;
}


/* RÉPONSE AUTOMATIQUE */

function getBotResponse(question) {

    const text = question.toLowerCase();


    if (
        text.includes("produit") ||
        text.includes("produits") ||
        text.includes("gamme")
    ) {

        return `
            ALCOCOA propose différentes catégories de produits
            issus du cacao, notamment la masse de cacao,
            le beurre de cacao, la poudre de cacao,
            les éclats et l'extrait de cacao.
            <br><br>
            <a href="produits.html">
                Découvrir nos produits →
            </a>
        `;
    }


    if (
        text.includes("import") ||
        text.includes("international") ||
        text.includes("logistique")
    ) {

        return `
            L'importation et le commerce international
            occupent une place importante dans les activités
            d'ALCOCOA.
            <br><br>
            Découvrez notre activité d'importation →
        `;
    }


    if (
        text.includes("producteur") ||
        text.includes("producteurs") ||
        text.includes("cacaoculture")
    ) {

        return `
            Les producteurs sont au cœur de la filière cacao.
            ALCOCOA souhaite développer des relations durables
            avec les acteurs de la chaîne d'approvisionnement.
            <br><br>
            Découvrez notre démarche →
        `;
    }


    if (
        text.includes("contact") ||
        text.includes("téléphone") ||
        text.includes("email") ||
        text.includes("joindre")
    ) {

        return `
            Vous pouvez contacter l'équipe ALCOCOA
            directement depuis notre page Contact.
            <br><br>
            <a href="#contact">
                Nous contacter →
            </a>
        `;
    }


    if (
        text.includes("bonjour") ||
        text.includes("salut") ||
        text.includes("bonsoir")
    ) {

        return `
            Bonjour 👋
            <br><br>
            Comment pouvons-nous vous aider ?
            Vous pouvez nous poser une question sur
            nos produits, notre activité d'importation
            ou nos producteurs.
        `;
    }


    return `
        Merci pour votre question.
        <br><br>
        Pour vous renseigner précisément, vous pouvez
        consulter nos différentes rubriques ou contacter
        directement l'équipe ALCOCOA.
        <br><br>
        <a href="#contact">
            Contacter ALCOCOA →
        </a>
    `;
}


/* ENVOYER */

function sendChatMessage() {

    const question = chatbotInput.value.trim();

    if (!question) return;

    addChatMessage(question, "user");

    chatbotInput.value = "";


    setTimeout(() => {

        const response = getBotResponse(question);

        addChatMessage(response, "bot");

    }, 500);
}


/* BOUTON ENVOYER */

if (chatbotSend) {
    chatbotSend.addEventListener(
        "click",
        sendChatMessage
    );
}


/* TOUCHE ENTRÉE */

if (chatbotInput) {

    chatbotInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                sendChatMessage();
            }

        }
    );

}


/* QUESTIONS RAPIDES */

quickActions.forEach(button => {

    button.addEventListener("click", () => {

        const question =
            button.dataset.question;

        chatbotInput.value = question;

        sendChatMessage();

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const heroSlides = document.querySelectorAll(".hero-slide");

    if (heroSlides.length > 1) {

        let currentSlide = 0;

        setInterval(() => {

            heroSlides[currentSlide].classList.remove("active");

            currentSlide = (currentSlide + 1) % heroSlides.length;

            heroSlides[currentSlide].classList.add("active");

        }, 2000);

    }

});