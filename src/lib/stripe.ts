import Stripe from "stripe";

let _stripe: Stripe | null = null;

/**
 * Lazily initialized Stripe server client.
 */
export function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

/**
 * Product definitions — maps our internal product types to Stripe prices.
 * You'll create these products in the Stripe dashboard and paste the price IDs here.
 */
export const PRODUCTS = {
  prenup: {
    name: "Prenup Agreement",
    priceInCents: 59900,
    // Replace with your real Stripe Price ID after creating the product in Stripe
    stripePriceId: process.env.STRIPE_PRICE_PRENUP || "",
  },
  attorney_single: {
    name: "Attorney Review (Single Partner)",
    priceInCents: 69900,
    stripePriceId: process.env.STRIPE_PRICE_ATTORNEY_SINGLE || "",
  },
  attorney_both: {
    name: "Attorney Review (Both Partners)",
    priceInCents: 139800,
    stripePriceId: process.env.STRIPE_PRICE_ATTORNEY_BOTH || "",
  },
  notarization: {
    name: "Online Notarization",
    priceInCents: 5000,
    stripePriceId: process.env.STRIPE_PRICE_NOTARIZATION || "",
  },
} as const;

export type ProductType = keyof typeof PRODUCTS;
