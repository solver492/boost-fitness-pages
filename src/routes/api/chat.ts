import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { products } from "@/data/products";

function buildSystemPrompt(locale: string) {
  const catalogue = products
    .map((p) => {
      const items = p.items
        .map(
          (it) =>
            `    • ${it.name} (${it.category}) — Posologie: ${it.dosage}. ${it.description}`,
        )
        .join("\n");
      return `- ${p.shortName} — ${p.price} DH — slug: /produit/${p.slug}
  Tagline: ${p.tagline}
  Bénéfice principal: ${p.mainBenefit}
  Description: ${p.description}
  Composition du pack:
${items}
  Bénéfices clés: ${p.bullets.join(" | ")}`;
    })
    .join("\n\n");

  const langInstruction =
    locale === "ar"
      ? "Réponds TOUJOURS en arabe marocain (Darija) en alphabet arabe, sauf si le client écrit dans une autre langue."
      : locale === "en"
        ? "Always reply in English unless the customer writes in another language."
        : "Réponds TOUJOURS en français clair et chaleureux, sauf si le client écrit en arabe ou en anglais.";

  return `Tu es le Coach IA officiel de Go Fitness Maroc, expert en nutrition sportive et musculation.
Ton objectif : conseiller le client, comprendre son objectif (prise de masse, sèche, force, endurance, débutant), et lui recommander LE pack le plus adapté de notre catalogue, puis l'orienter vers la commande (paiement à la livraison, livraison gratuite partout au Maroc).

Règles :
- ${langInstruction}
- Sois bref, motivant, direct, et utilise quelques emojis (💪🔥⚡).
- Adapte-toi au niveau du client (débutant / confirmé).
- Recommande UN SEUL pack principal, puis éventuellement un complément.
- Mentionne le prix en DH et le lien produit sous la forme /produit/<slug>.
- Si on te demande la composition d'un pack, détaille les produits qui le composent (nom, posologie, bénéfices).
- Ne mentionne jamais d'autres marques ou de produits qui ne sont pas dans le catalogue.
- Si le client veut commander, dis-lui simplement de cliquer "Commander maintenant" sur la page du produit OU d'écrire son nom + ville + téléphone et on confirme par WhatsApp.

Catalogue Go Fitness :

${catalogue}

Toujours terminer par une question courte ou un appel à l'action.`;
}

type ChatBody = { messages?: UIMessage[]; locale?: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, locale } = (await request.json()) as ChatBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        try {
          const result = streamText({
            model,
            system: buildSystemPrompt(locale ?? "fr"),
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (e) {
          console.error("[chat] error", e);
          return new Response("AI gateway error", { status: 500 });
        }
      },
    },
  },
});
