"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Check, Shield, Star, Zap, Loader2 } from "lucide-react";

const plans = [
  {
    name: "Prenup Agreement",
    price: "$599",
    perLabel: "per couple",
    productType: "prenup",
    description:
      "A complete, state-specific prenuptial agreement tailored to your situation.",
    features: [
      "Full 8-step questionnaire access",
      "State-specific legal language",
      "Financial disclosure tools",
      "Partner collaboration features",
      "Downloadable, editable PDF",
      "Unlimited revisions before signing",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Attorney Review",
    price: "$699",
    perLabel: "per partner",
    productType: "attorney_single",
    description:
      "Independent legal review by a licensed family law attorney in your state.",
    features: [
      "1:1 video consultation",
      "Full document review",
      "Certificate of Independent Legal Review",
      "Personalized legal advice",
      "Includes online notarization",
    ],
    cta: "Coming Soon",
    highlighted: false,
    comingSoon: true,
  },
  {
    name: "Notarization Only",
    price: "$50",
    perLabel: "standalone",
    productType: "notarization",
    description:
      "Online notarization for couples who already have attorney review or want to self-represent.",
    features: [
      "Secure video notary session",
      "Licensed notary in your state",
      "Digital notarized document",
      "Same-day availability",
    ],
    cta: "Coming Soon",
    highlighted: false,
    comingSoon: true,
  },
];

export default function PaymentPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (productType: string) => {
    setLoading(productType);
    setError(null);

    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.");
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Choose Your Plan
        </h1>
        <p className="text-text-secondary mt-2 max-w-lg mx-auto">
          Invest in your future together. Our pricing is transparent with no
          hidden fees or hourly billing.
        </p>
      </div>

      {/* Savings callout */}
      <div className="rounded-[12px] bg-gradient-to-r from-teal/5 via-teal/10 to-navy/5 border border-teal/20 p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-teal" />
          <span className="text-sm font-semibold text-navy">
            Save thousands compared to traditional attorneys
          </span>
        </div>
        <p className="text-xs text-text-secondary">
          Traditional prenup attorneys charge $1,500 — $5,000+ per person. Our
          flat-fee approach saves you 80% or more.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-[12px] bg-coral/10 border border-coral/20 p-4 text-center">
          <p className="text-sm text-coral font-medium">{error}</p>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-card rounded-[16px] p-6 flex flex-col ${
              plan.highlighted
                ? "shadow-card-hover ring-2 ring-navy relative"
                : "shadow-card"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" /> Most Popular
              </div>
            )}
            <h3 className="text-lg font-semibold text-navy">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-navy">{plan.price}</span>
              <span className="text-sm text-text-secondary">
                {plan.perLabel}
              </span>
            </div>
            <p className="text-sm text-text-secondary mt-3">
              {plan.description}
            </p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span className="text-navy/80">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button
                variant={plan.highlighted ? "primary" : plan.comingSoon ? "disabled" : "secondary"}
                size="md"
                className="w-full justify-center"
                onClick={() => !plan.comingSoon && handleCheckout(plan.productType)}
                disabled={loading !== null || plan.comingSoon}
              >
                {loading === plan.productType ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  plan.cta
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4" />
          <span>Secure payment</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-4 h-4" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
}
