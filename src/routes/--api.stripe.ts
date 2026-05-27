import { createAPIFileRoute } from "@tanstack/react-start/api";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51TbJP7CSiOAfRUNztGVq2m7iW9c8Zs1hzYdHRq0zLBGh2xEaaTIvjgjPKrNbssn1HgaPOc4tk3ZJzx0upD6HqLh100yW826cY5"
);

const SITE_URL = "https://volta-lens-craft.nolann2103.workers.dev";

export const APIRoute = createAPIFileRoute("/api/stripe")({
  POST: async ({ request }) => {
    try {
      const { amount, briefId, type, email, description } = await request.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: `Mission Voltra — ${description ?? "Photographie"}`,
                description: "Paiement sécurisé. Les fonds sont bloqués chez Voltra jusqu'à votre confirmation de satisfaction.",
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        metadata: { briefId, type },
        payment_intent_data: {
          capture_method: "automatic",
          metadata: { briefId, type },
        },
        success_url: `${SITE_URL}/mon-espace?payment=success&brief=${briefId}`,
        cancel_url: `${SITE_URL}/mon-espace?payment=cancelled`,
      });

      return Response.json({ url: session.url });
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  },
});
