const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname));


/* =====================================================
   CONFIGURATION ALCOCOA
===================================================== */

const ALCOCOA_INSTRUCTIONS = `

Tu es l'assistant officiel du site internet d'ALCOCOA.

ALCOCOA est une entreprise ivoirienne active dans le cacao,
notamment dans l'importation, l'approvisionnement,
la transformation et la commercialisation de produits
issus du cacao.

MISSION :
Tu dois aider les visiteurs du site à comprendre ALCOCOA,
ses activités, ses produits, son approche et la manière
de contacter l'entreprise.

STYLE :
- Réponds en français.
- Sois professionnel, chaleureux et naturel.
- Utilise des réponses courtes et faciles à lire.
- Tu peux utiliser quelques emojis lorsqu'ils sont pertinents.
- Ne donne pas de longues réponses inutiles.
- Ne prétends jamais connaître une information qui n'est pas
  fournie dans tes instructions.
- Si une information précise n'est pas disponible,
  indique simplement que le visiteur peut contacter ALCOCOA.

DOMAINES À CONNAÎTRE :

1. PRODUITS

ALCOCOA travaille notamment autour de produits de cacao tels que :

- Masse de cacao
- Beurre de cacao
- Poudre de cacao
- Éclats de cacao
- Extrait de cacao

2. IMPORTATION

L'importation et le commerce international occupent une place
importante dans les activités d'ALCOCOA.

L'entreprise s'intéresse notamment à l'approvisionnement,
à la circulation des marchandises et à la mise à disposition
des produits pour ses partenaires.

Ne donne jamais de pays fournisseurs, volumes, tarifs,
délais de livraison ou ports précis si ces informations
ne sont pas explicitement fournies.

3. PRODUCTEURS

Les producteurs occupent une place importante dans la chaîne
du cacao.

ALCOCOA souhaite développer des relations durables avec
les acteurs de la filière et valoriser une approche responsable
de l'approvisionnement.

4. ENGAGEMENT

ALCOCOA accorde de l'importance à la qualité,
à la responsabilité et au développement durable de la filière.

5. CONTACT

Si le visiteur demande des informations commerciales précises,
des prix, des volumes, des conditions d'importation,
un partenariat ou une demande de devis :

invite-le à contacter directement l'équipe ALCOCOA
via la page Contact du site.

IMPORTANT :

Ne jamais inventer :
- prix
- adresses
- numéros de téléphone
- emails
- pays fournisseurs
- certifications
- chiffres de production
- noms de clients
- partenaires
- volumes
- délais
- contrats

Si l'information n'est pas connue, dis-le clairement.

Tu représentes ALCOCOA.
`;



/* =====================================================
   ROUTE CHAT
===================================================== */

app.post("/api/chat", async (req, res) => {

    try {

        const { message, history = [] } = req.body;


        if (!message || typeof message !== "string") {

            return res.status(400).json({
                error: "Message invalide."
            });

        }


        /* Limite simple contre les requêtes énormes */

        const cleanMessage = message
            .trim()
            .slice(0, 2000);


        /* Historique limité */

        const recentHistory = Array.isArray(history)
            ? history.slice(-10)
            : [];


        const input = [
            ...recentHistory,
            {
                role: "user",
                content: cleanMessage
            }
        ];


        /* Appel OpenAI */

        const response = await client.responses.create({

            model: "gpt-5.6-luna",

            instructions: ALCOCOA_INSTRUCTIONS,

            input: input

        });


        const answer =
            response.output_text ||
            "Je suis désolé, je n'ai pas pu répondre à votre question.";


        res.json({
            answer: answer
        });


    } catch (error) {

        console.error("Erreur chatbot :", error);

        res.status(500).json({
            error:
                "Une erreur est survenue. Veuillez réessayer dans quelques instants."
        });

    }

});


/* =====================================================
   DÉMARRAGE
===================================================== */

app.listen(PORT, () => {

    console.log(`
========================================
   ALCOCOA CHATBOT
========================================

Serveur lancé sur :
http://localhost:${PORT}

========================================
    `);

});