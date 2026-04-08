"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ClipboardList,
  FileText,
  Stamp,
  Globe,
  Users,
  DollarSign,
  PenTool,
  Scale,
  RefreshCw,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Star,
  BadgeCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold text-navy font-[family-name:var(--font-heading)]">
              OurPrenup
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo("how-it-works")}
              className="text-sm font-medium text-navy-dark/70 hover:text-navy transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="text-sm font-medium text-navy-dark/70 hover:text-navy transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="text-sm font-medium text-navy-dark/70 hover:text-navy transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-semibold text-navy hover:text-navy-light transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-navy-light transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-navy-dark"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-6 pt-2 space-y-4">
          <button
            onClick={() => scrollTo("how-it-works")}
            className="block w-full text-left text-base font-medium text-navy-dark/80 py-2"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo("pricing")}
            className="block w-full text-left text-base font-medium text-navy-dark/80 py-2"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollTo("faq")}
            className="block w-full text-left text-base font-medium text-navy-dark/80 py-2"
          >
            FAQ
          </button>
          <hr className="border-border" />
          <Link
            href="/sign-in"
            className="block text-base font-semibold text-navy py-2"
            onClick={() => setMobileOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="block text-center bg-navy text-white text-base font-semibold px-5 py-3 rounded-full hover:bg-navy-light transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(170deg, #F7F8FC 0%, #EDE7F6 40%, #F7F8FC 70%, #EBF0FF 100%)",
        }}
      />
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full bg-pink/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-navy/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-border rounded-full px-4 py-1.5 mb-8 shadow-card">
          <BadgeCheck size={16} className="text-success" />
          <span className="text-sm font-medium text-navy-dark/80">
            Trusted by 10,000+ couples nationwide
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-dark leading-tight font-[family-name:var(--font-heading)] max-w-4xl mx-auto">
          Protect What Matters Most
          <span className="text-pink">&nbsp;&mdash;&nbsp;</span>
          <span className="text-navy">Together.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Create a legally binding, state-specific prenuptial agreement online
          &mdash; in hours, not weeks. No $5,000 attorney fees. No awkward
          office visits. Just clarity and confidence for your future together.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-navy text-white text-base font-semibold px-8 py-4 rounded-full hover:bg-navy-light transition-colors shadow-card-hover"
          >
            Create Your Prenup&nbsp;&mdash;&nbsp;$599
            <ArrowRight size={18} />
          </Link>
          <button
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center gap-2 bg-transparent text-navy border border-navy text-base font-semibold px-8 py-4 rounded-full hover:bg-navy/5 transition-colors cursor-pointer"
          >
            See How It Works
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {[
            { icon: Globe, label: "Valid in all 50 states" },
            { icon: Scale, label: "Attorney-reviewed templates" },
            { icon: Lock, label: "Bank-level encryption" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-navy-dark/60"
            >
              <Icon size={18} className="text-teal" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SOCIAL PROOF BAR                                                   */
/* ------------------------------------------------------------------ */

function SocialProof() {
  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-warning fill-warning"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-navy-dark">4.9/5</span>
            <span className="text-sm text-text-secondary">
              from 2,400+ reviews
            </span>
          </div>

          <div className="hidden md:block w-px h-8 bg-border" />

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-navy font-[family-name:var(--font-heading)]">
                10,000+
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Couples served
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-navy font-[family-name:var(--font-heading)]">
                50
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                States covered
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-navy font-[family-name:var(--font-heading)]">
                &lt; 2 hrs
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Average completion
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS                                                       */
/* ------------------------------------------------------------------ */

const steps = [
  {
    num: 1,
    icon: ClipboardList,
    title: "Answer Questions Together",
    description:
      "Walk through our guided questionnaire as a couple. Cover assets, debts, property, spousal support, and more — at your own pace, from anywhere.",
  },
  {
    num: 2,
    icon: FileText,
    title: "We Generate Your Agreement",
    description:
      "Our 50-state legal engine creates a customized prenuptial agreement tailored to your state's laws, your assets, and your shared decisions.",
  },
  {
    num: 3,
    icon: Stamp,
    title: "Sign & Notarize",
    description:
      "Review your completed agreement, e-sign it together, and get it notarized — all online. Your prenup is legally ready to go.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-teal uppercase tracking-wide mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark font-[family-name:var(--font-heading)]">
            Three Steps to Peace of Mind
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            No complicated paperwork. No back-and-forth with attorneys. Just a
            clear path from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative text-center group">
                {/* Connector line (hidden on mobile and last item) */}
                {step.num < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                {/* Number badge */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-navy text-white mb-6 shadow-card-hover group-hover:scale-105 transition-transform">
                  <Icon size={32} strokeWidth={1.8} />
                  <span className="absolute -top-1 -right-1 w-7 h-7 bg-pink text-white text-xs font-bold rounded-full flex items-center justify-center shadow-card">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURES GRID                                                      */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Globe,
    title: "50-State Legal Engine",
    description:
      "Our rules engine covers community property, equitable distribution, and every legal nuance across all 50 U.S. states.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: Users,
    title: "Partner Collaboration",
    description:
      "Both partners work through the agreement together in real time. Shared dashboard, shared decisions, complete transparency.",
    color: "bg-purple/10 text-purple",
  },
  {
    icon: DollarSign,
    title: "Financial Disclosure Tools",
    description:
      "Built-in tools to catalog assets, debts, income, and property — organized and formatted exactly as your state requires.",
    color: "bg-pink/10 text-pink",
  },
  {
    icon: PenTool,
    title: "E-Sign & Notarize",
    description:
      "Sign your agreement electronically and get it notarized online. No printing, scanning, or trips to the notary office.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: Scale,
    title: "Attorney Review Available",
    description:
      "Want an extra layer of confidence? Add a licensed attorney review of your completed agreement for peace of mind.",
    color: "bg-purple/10 text-purple",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Revisions",
    description:
      "Life changes. So can your agreement. Make unlimited edits before finalizing — no extra charges, no pressure.",
    color: "bg-pink/10 text-pink",
  },
];

function Features() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-pink uppercase tracking-wide mb-3">
            Everything You Need
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark font-[family-name:var(--font-heading)]">
            Built for Modern Couples
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Every feature designed to make creating a prenup as painless,
            transparent, and thorough as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-bg rounded-[16px] p-8 hover:shadow-card-hover transition-shadow duration-300 border border-border/60"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-[12px] ${f.color} mb-5`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-navy-dark font-[family-name:var(--font-heading)] mb-2">
                  {f.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRICING                                                            */
/* ------------------------------------------------------------------ */

const pricingPlans = [
  {
    name: "Prenup Agreement",
    price: "$599",
    per: "per couple",
    badge: "Most Popular",
    highlighted: true,
    description:
      "Everything you need to create a legally binding prenuptial agreement, customized to your state.",
    features: [
      "Guided questionnaire for both partners",
      "State-specific legal document generation",
      "Financial disclosure worksheets",
      "Unlimited revisions before finalizing",
      "Downloadable PDF agreement",
      "E-signature for both partners",
    ],
    cta: "Get Started",
    href: "/dashboard",
  },
  {
    name: "Attorney Review",
    price: "$699",
    per: "per partner",
    badge: null,
    highlighted: false,
    description:
      "Have a licensed family law attorney review your completed agreement and provide feedback.",
    features: [
      "Review by a licensed attorney in your state",
      "Written summary of findings",
      "Suggestions for strengthening enforceability",
      "One round of follow-up questions",
      "Completed within 3-5 business days",
    ],
    cta: "Add Attorney Review",
    href: "/dashboard",
  },
  {
    name: "Online Notarization",
    price: "$50",
    per: "per session",
    badge: null,
    highlighted: false,
    description:
      "Get your signed agreement notarized online with a certified remote notary.",
    features: [
      "Live video notarization session",
      "Certified remote online notary",
      "Digital notary seal and certificate",
      "Completed in under 30 minutes",
      "Valid in all 50 states",
    ],
    cta: "Add Notarization",
    href: "/dashboard",
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24 bg-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-teal uppercase tracking-wide mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark font-[family-name:var(--font-heading)]">
            Simple, Upfront Pricing
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            No hidden fees. No surprise charges. Pay once and own your agreement
            forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[16px] p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-navy text-white ring-2 ring-pink shadow-card-hover scale-[1.02]"
                  : "bg-white text-navy-dark border border-border shadow-card"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink text-white text-xs font-bold px-4 py-1 rounded-full shadow-card">
                  {plan.badge}
                </span>
              )}

              <h3
                className={`text-lg font-bold font-[family-name:var(--font-heading)] ${
                  plan.highlighted ? "text-white" : "text-navy-dark"
                }`}
              >
                {plan.name}
              </h3>

              <div className="mt-4 mb-2">
                <span
                  className={`text-4xl font-extrabold font-[family-name:var(--font-heading)] ${
                    plan.highlighted ? "text-white" : "text-navy"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-1.5 ${
                    plan.highlighted ? "text-white/70" : "text-text-secondary"
                  }`}
                >
                  {plan.per}
                </span>
              </div>

              <p
                className={`text-sm leading-relaxed mb-6 ${
                  plan.highlighted ? "text-white/80" : "text-text-secondary"
                }`}
              >
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        plan.highlighted ? "text-success" : "text-success"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-white/90" : "text-navy-dark/80"
                      }`}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`inline-flex items-center justify-center font-semibold rounded-full py-3.5 px-6 text-base transition-colors ${
                  plan.highlighted
                    ? "bg-white text-navy hover:bg-lavender"
                    : "bg-navy text-white hover:bg-navy-light"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STATE COVERAGE                                                     */
/* ------------------------------------------------------------------ */

const sampleStates = [
  "California",
  "Texas",
  "New York",
  "Florida",
  "Illinois",
  "Pennsylvania",
  "Ohio",
  "Georgia",
  "Washington",
  "Arizona",
  "Massachusetts",
  "Colorado",
];

function StateCoverage() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 mb-6">
            <ShieldCheck size={32} className="text-teal" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark font-[family-name:var(--font-heading)]">
            Legally Valid in All 50 States
          </h2>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Our legal engine understands the nuances of every state — from
            community property states like California and Texas to equitable
            distribution states like New York and Florida. Your agreement is
            generated to comply with your specific state&apos;s requirements for
            enforceability.
          </p>
        </div>

        {/* State badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {sampleStates.map((state) => (
            <span
              key={state}
              className="inline-flex items-center gap-1.5 bg-bg border border-border rounded-full px-4 py-2 text-sm font-medium text-navy-dark/70"
            >
              <CheckCircle2 size={14} className="text-success" />
              {state}
            </span>
          ))}
          <span className="inline-flex items-center bg-navy/5 border border-navy/10 rounded-full px-4 py-2 text-sm font-semibold text-navy">
            + 38 more states
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "Is an online prenup legally binding?",
    a: "Yes. A prenuptial agreement created through OurPrenup is a legally binding contract, provided it meets your state's requirements — which our platform is specifically designed to satisfy. Requirements typically include full financial disclosure, voluntary signing, and in some states, notarization. Our guided process walks you through every requirement.",
  },
  {
    q: "Do we both need separate attorneys?",
    a: "It depends on your state. Some states strongly recommend (or effectively require) that each partner consult independent legal counsel for the agreement to be enforceable. Our platform will alert you if your state has this recommendation, and we offer an optional attorney review add-on for additional peace of mind.",
  },
  {
    q: "How long does the process take?",
    a: "Most couples complete their agreement in one to two hours of active work. You can save your progress and return at any time — there's no deadline. Once you finalize your answers, your agreement is generated instantly.",
  },
  {
    q: "What if we disagree on something?",
    a: "Disagreement is a normal part of the process. Our platform is designed for collaborative decision-making: both partners can see each other's responses, flag items for discussion, and work through differences together. If you get stuck, that's also a great time to consider our attorney review add-on.",
  },
  {
    q: "Can we make changes after generating the agreement?",
    a: "Absolutely. You can revise your answers and regenerate your agreement as many times as you need before finalizing. There are no extra charges for revisions. Once you've e-signed and notarized, however, changes would require a formal amendment.",
  },
  {
    q: "What states do you cover?",
    a: "We cover all 50 U.S. states and the District of Columbia. Our legal rules engine accounts for the specific requirements of each jurisdiction, including community property vs. equitable distribution states, notarization requirements, and disclosure standards.",
  },
  {
    q: "Is my information secure?",
    a: "Yes. We use bank-level AES-256 encryption for all data at rest and TLS 1.3 for data in transit. Your financial information is never shared with third parties. We follow SOC 2 security practices and conduct regular security audits.",
  },
  {
    q: "What's included in the $599 price?",
    a: "The $599 covers your complete prenuptial agreement for both partners: the guided questionnaire, financial disclosure tools, state-specific document generation, unlimited revisions, e-signatures, and a downloadable PDF. Attorney review and notarization are available as optional add-ons.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-bg scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-purple uppercase tracking-wide mb-3">
            Common Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-dark font-[family-name:var(--font-heading)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-[12px] border border-border overflow-hidden transition-shadow hover:shadow-card"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full text-left px-6 py-5 cursor-pointer"
                >
                  <span className="text-base font-semibold text-navy-dark pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-text-secondary transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-text-secondary text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA BANNER                                                         */
/* ------------------------------------------------------------------ */

function CtaBanner() {
  return (
    <section className="py-20 sm:py-24 bg-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-navy-light/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-pink/10 blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-heading)]">
          Start Protecting Your Future Today
        </h2>
        <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto">
          Join thousands of couples who chose clarity and confidence over
          uncertainty. Your prenup can be ready in hours.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-white text-navy text-base font-semibold px-8 py-4 rounded-full hover:bg-lavender transition-colors"
          >
            Create Your Prenup
            <ArrowRight size={18} />
          </Link>
          <button
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 text-base font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
              OurPrenup
            </span>
            <p className="mt-4 text-sm leading-relaxed max-w-md">
              Modern prenuptial agreements for modern couples. Affordable,
              transparent, and legally sound — in every state.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm hover:text-white transition-colors cursor-pointer"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("faq")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm hover:text-white transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer + Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs leading-relaxed text-white/40 max-w-3xl">
            OurPrenup provides self-help tools for creating prenuptial
            agreements. We are not a law firm and do not provide legal advice.
            For legal advice, consult a licensed attorney in your state. The
            information provided on this platform is for general informational
            purposes only and should not be construed as legal advice.
          </p>
          <p className="mt-4 text-xs text-white/40">
            &copy; 2026 OurPrenup. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <Pricing />
      <StateCoverage />
      <FAQ />
      <CtaBanner />
      <Footer />
    </main>
  );
}
