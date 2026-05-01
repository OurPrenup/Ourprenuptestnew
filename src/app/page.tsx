"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Globe,
  Lock,
  Shield,
  Check,
  Star,
} from "lucide-react";

/* ── Data ──────────────────────────────────────────────────────────── */

const NAV_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","DC","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana",
  "Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia",
  "Washington","West Virginia","Wisconsin","Wyoming",
];

const COUPLES = [
  { names: "Sophie & James", state: "California", abbr: "CA", bg: "#8B6F5E" },
  { names: "Aaliyah & Marcus", state: "Texas", abbr: "TX", bg: "#5E7A6F" },
  { names: "Priya & Daniel", state: "New York", abbr: "NY", bg: "#6B5E7A" },
  { names: "Emma & Noah", state: "Florida", abbr: "FL", bg: "#7A6B5E" },
  { names: "Yuki & Brandon", state: "Washington", abbr: "WA", bg: "#5E6B7A" },
  { names: "Fatima & Carlos", state: "Illinois", abbr: "IL", bg: "#7A5E6B" },
  { names: "Grace & Liam", state: "Colorado", abbr: "CO", bg: "#6B7A5E" },
  { names: "Olivia & Ethan", state: "Georgia", abbr: "GA", bg: "#7A7A5E" },
  { names: "Chloe & Mateo", state: "Arizona", abbr: "AZ", bg: "#5E7A7A" },
  { names: "Nia & Tyler", state: "Massachusetts", abbr: "MA", bg: "#7A5E5E" },
  { names: "Sara & Michael", state: "Pennsylvania", abbr: "PA", bg: "#6F5E8B" },
  { names: "Zoe & Chris", state: "Ohio", abbr: "OH", bg: "#5E8B6F" },
  { names: "Mia & Jordan", state: "Michigan", abbr: "MI", bg: "#8B5E6F" },
  { names: "Leila & Sam", state: "North Carolina", abbr: "NC", bg: "#6F8B5E" },
  { names: "Anna & Ryan", state: "Virginia", abbr: "VA", bg: "#5E6F8B" },
  { names: "Jade & Alex", state: "Nevada", abbr: "NV", bg: "#8B8B5E" },
  { names: "Maya & Kevin", state: "Oregon", abbr: "OR", bg: "#5E8B8B" },
  { names: "Isabel & Drew", state: "Tennessee", abbr: "TN", bg: "#8B5E8B" },
  { names: "Claire & Jake", state: "Minnesota", abbr: "MN", bg: "#6B6B6B" },
  { names: "Aisha & Ben", state: "Maryland", abbr: "MD", bg: "#8B7A5E" },
];

const HOW_IT_WORKS_STEPS = [
  { n: "01", title: "Answer questions together", body: "Both partners complete their own questionnaire — covering assets, debts, property, spousal support, and more. Work at your own pace from anywhere." },
  { n: "02", title: "We generate your agreement", body: "Our 50-state legal engine produces a customized prenup tailored to your state's laws, your assets, and your decisions." },
  { n: "03", title: "Sign & notarize in minutes", body: "Review, e-sign, and notarize your completed agreement online — fully legally valid. No printing, no office visits." },
];

const PRICING_PLANS = [
  {
    name: "Prenup Agreement", price: "$599", per: "per couple", featured: true, badge: "Most Popular",
    desc: "Everything you need to create a legally binding, state-specific prenup — together.",
    items: ["Guided questionnaire for both partners", "State-specific document generation", "Financial disclosure worksheets", "Unlimited revisions before signing", "Downloadable PDF + e-signature"],
    href: "/sign-up",
  },
  {
    name: "Attorney Review", price: "$699", per: "per partner", featured: false, badge: null,
    desc: "Have a licensed family law attorney review your completed agreement.",
    items: ["Licensed attorney in your state", "Written summary of findings", "Strengthening enforceability tips", "One round of follow-up Q&A", "Completed in 3–5 business days"],
    href: null,
  },
  {
    name: "Online Notarization", price: "$50", per: "per couple", featured: false, badge: null,
    desc: "Get your signed agreement notarized online with a certified remote notary.",
    items: ["Live video session with notary", "Certified remote online notary", "Digital seal and certificate", "Under 30 minutes", "Valid in all 50 states"],
    href: null,
  },
];

const ALL_STATE_NAMES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia",
  "Washington","West Virginia","Wisconsin","Wyoming","DC",
];

const FAQS = [
  { q: "Is an online prenup legally binding?", a: "Yes. OurPrenup agreements are legally binding contracts, provided they meet your state's requirements — which our platform is specifically designed to satisfy. Requirements typically include full financial disclosure, voluntary signing, and in some states, notarization." },
  { q: "Do we need separate attorneys?", a: "It depends on your state. Some states recommend (or effectively require) that each partner consult independent legal counsel. Our platform flags this for your state, and we offer optional attorney review for peace of mind." },
  { q: "How long does the process take?", a: "Most couples finish in 1–2 hours of active work. You can save progress and return anytime. Once you finalize your answers, your agreement is generated instantly." },
  { q: "Can we make changes after generating the agreement?", a: "Absolutely — unlimited revisions before you sign. After e-signing and notarizing, changes would require a formal amendment." },
  { q: "What if we disagree on something?", a: "Disagreement is normal. Both partners can see each other's responses, flag items for discussion, and work through differences together. Our collaboration tools are built for this." },
  { q: "What does $599 include?", a: "Everything for both partners: the guided questionnaire, financial disclosure tools, state-specific document generation, unlimited revisions, e-signatures for both partners, and a downloadable PDF. Notarization and attorney review are optional add-ons." },
];

const TESTIMONIALS = [
  { quote: "OurPrenup made the whole process feel collaborative, not adversarial. We both felt heard.", name: "Jordan & Casey", state: "California" },
  { quote: "The document was thorough and the process was so much simpler than we expected.", name: "Marcus T.", state: "Texas" },
  { quote: "As someone who's been through a divorce, I can tell you: do this. So much easier than anything I went through before.", name: "Priya S.", state: "New York" },
  { quote: "Took us 90 minutes on a Sunday afternoon. Signed, notarized, done.", name: "Alex & Sam", state: "Florida" },
  { quote: "The questionnaire actually helped us have important conversations we hadn't had yet.", name: "Diane W.", state: "Colorado" },
];

/* ── Hooks ─────────────────────────────────────────────────────────── */

function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId: number | null = null;
    let cancelled = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let startTime: number | null = null;
        const step = (ts: number) => {
          if (cancelled) return;
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) rafId = requestAnimationFrame(step);
          else setCount(target);
        };
        rafId = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      cancelled = true;
      obs.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return { count, ref };
}

/* ── Navbar ─────────────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      setTopBarVisible(window.scrollY < 60);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const dark = !scrolled;

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]" style={{
      background: scrolled ? "rgba(250,250,247,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
      boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.07)" : "none",
      transition: "background 0.3s, box-shadow 0.3s",
    }}>
      {/* Top promo bar */}
      {topBarVisible && (
        <div className="flex items-center justify-center h-9 text-[13px]"
          style={{ background: "#071443", color: "rgba(255,255,255,0.85)" }}>
          Prenups made simple.
        </div>
      )}

      {/* Main nav */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link href="/" className="text-[22px] font-bold font-[family-name:var(--font-heading)]"
            style={{ color: dark ? "#fff" : "#071443" }}>
            OurPrenup
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "How It Works", action: () => scrollTo("how-it-works") },
              { label: "Pricing", action: () => scrollTo("pricing") },
              { label: "FAQ", action: () => scrollTo("faq") },
            ].map(({ label, action }) => (
              <button key={label} onClick={action}
                className="text-sm font-medium px-2.5 py-1.5 rounded-md transition-colors hover:bg-[rgba(15,33,98,0.05)]"
                style={{ color: dark ? "#fff" : "#071443" }}>
                {label}
              </button>
            ))}

            {/* States dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium px-2.5 py-1.5 rounded-md transition-colors hover:bg-[rgba(15,33,98,0.05)] flex items-center gap-1"
                style={{ color: dark ? "#fff" : "#071443" }}>
                States
                <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-[#e8e8f0] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.14)] p-5 w-[580px] grid grid-cols-4 gap-0.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 translate-y-2 group-hover:translate-y-0 z-[200]">
                <div className="col-span-4 text-[11px] font-bold tracking-wider uppercase text-[#5a5a72] px-2.5 pb-2.5 mb-1.5 border-b border-[#e8e8f0]">
                  All 50 States + DC
                </div>
                {NAV_STATES.map((s) => (
                  <span key={s} className="text-[13px] text-[#071443] px-2.5 py-1.5 rounded-lg hover:bg-[#fce8f1] hover:text-[#E84C88] transition-colors cursor-default truncate">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in" className="text-sm font-medium px-2.5 py-1.5"
              style={{ color: dark ? "#fff" : "#071443" }}>
              Sign In
            </Link>
            <Link href="/sign-up"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              style={{ background: dark ? "#E84C88" : "#071443" }}>
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1"
            style={{ color: dark ? "#fff" : "#071443" }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FAFAF7] border-t border-[#e8e8f0] px-6 py-4 flex flex-col gap-1">
          {["How It Works", "Pricing", "FAQ"].map((label) => (
            <button key={label} onClick={() => scrollTo(label.toLowerCase().replace(/\s+/g, "-"))}
              className="text-left text-base text-[#071443] font-medium py-2.5 px-2">
              {label}
            </button>
          ))}
          <hr className="border-[#e8e8f0] my-2" />
          <Link href="/sign-in" onClick={() => setMobileOpen(false)}
            className="text-center text-base text-[#071443] font-medium py-2.5 px-2">
            Sign In
          </Link>
          <Link href="/sign-up" onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#071443] text-white font-semibold py-3 rounded-full mt-1">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ── Couple Carousel ───────────────────────────────────────────────── */

function CoupleCarousel() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flippingRef = useRef(false);
  flippingRef.current = flipping;

  const advance = useCallback((dir = 1) => {
    if (flippingRef.current) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent((c) => (c + dir + COUPLES.length) % COUPLES.length);
      setFlipping(false);
    }, 420);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => advance(1), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const couple = COUPLES[current];

  return (
    <div className="relative w-full max-w-[380px]">
      {/* Card */}
      <div className="rounded-3xl overflow-hidden relative"
        style={{
          aspectRatio: "3/4",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          transform: flipping
            ? `perspective(900px) rotateY(${direction * 90}deg) scale(0.96)`
            : "perspective(900px) rotateY(0deg) scale(1)",
          transition: "transform 0.42s cubic-bezier(0.4,0,0.2,1)",
          background: couple.bg,
        }}>
        {/* Placeholder */}
        <div className="w-full h-full flex flex-col items-center justify-center gap-2"
          style={{ background: `linear-gradient(160deg, ${couple.bg}cc 0%, ${couple.bg} 100%)` }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.25">
            <circle cx="60" cy="42" r="22" fill="white" />
            <ellipse cx="60" cy="95" rx="38" ry="28" fill="white" />
          </svg>
          <span className="text-white/30 text-xs tracking-wider">COUPLE PHOTO</span>
        </div>

        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)", padding: "40px 20px 20px" }}>
          <div>
            <div className="text-white font-bold text-lg font-[family-name:var(--font-heading)] leading-tight">
              {couple.names}
            </div>
            <div className="text-white/65 text-[13px] mt-1">Married in {couple.state}</div>
          </div>
          <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-[10px] px-2.5 py-1.5 shrink-0">
            <div className="text-[11px] font-extrabold text-white tracking-wider">{couple.abbr}</div>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button onClick={() => { if (timerRef.current) clearInterval(timerRef.current); advance(-1); }}
        className="absolute top-1/2 -left-[18px] -translate-y-1/2 w-9 h-9 rounded-full bg-white/[0.12] backdrop-blur-lg border border-white/20 text-white flex items-center justify-center text-base hover:bg-white/[0.22] transition-colors"
        aria-label="Previous couple">
        &#8249;
      </button>
      <button onClick={() => { if (timerRef.current) clearInterval(timerRef.current); advance(1); }}
        className="absolute top-1/2 -right-[18px] -translate-y-1/2 w-9 h-9 rounded-full bg-white/[0.12] backdrop-blur-lg border border-white/20 text-white flex items-center justify-center text-base hover:bg-white/[0.22] transition-colors"
        aria-label="Next couple">
        &#8250;
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {COUPLES.map((_, i) => (
          <button key={i}
            onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setCurrent(i); }}
            className="h-1.5 rounded-full border-none transition-all duration-300"
            style={{
              width: i === current ? 20 : 6,
              background: i === current ? "#E84C88" : "rgba(255,255,255,0.25)",
            }}
            aria-label={`Couple ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: "#071443", paddingTop: 140, paddingBottom: 80 }}>
      {/* Decorative blobs */}
      <div className="absolute -top-[100px] right-[30%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(232,76,136,0.06)" }} />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(26,58,143,0.4)" }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-[1] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-20 items-center">
          {/* Left: copy */}
          <div>
            <div className="mb-7">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full"
                style={{ background: "rgba(232,76,136,0.15)", color: "#E84C88" }}>
                Built for couples in all 50 states
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-white leading-[1.05] mb-6"
              style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}>
              The Smartest Thing<br />You&apos;ll Do Before<br />
              <em className="text-[#E84C88]">&ldquo;I Do.&rdquo;</em>
            </h1>
            <p className="text-white/65 max-w-[480px] leading-relaxed mb-10"
              style={{ fontSize: "clamp(16px, 1.8vw, 19px)" }}>
              State-specific prenups in under 2 hours &mdash; drafted, reviewed, signed, and notarized online. For a fraction of attorney fees.
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/sign-up"
                className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-colors hover:opacity-90"
                style={{ background: "#E84C88", fontSize: 16 }}>
                Start Your Prenup &mdash; $599
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full border-2 border-white/40 transition-colors hover:bg-white/[0.15] cursor-pointer"
                style={{ fontSize: 16 }}>
                See How It Works
              </button>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Globe, label: "Valid in all 50 states" },
                { icon: Lock, label: "Bank-level encryption" },
                { icon: Shield, label: "State-specific legal engine" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/50 text-sm">
                  <Icon size={18} className="text-[#0D8B8B]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: carousel */}
          <div className="hidden lg:flex justify-center">
            <CoupleCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Bar ─────────────────────────────────────────────────────── */

function StatsBar() {
  const s1 = useCounter(50);
  const s2 = useCounter(2);
  const s3 = useCounter(599);

  return (
    <div className="bg-white border-y border-[#e8e8f0]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4">
        <div ref={s1.ref} className="text-center py-7 px-6 border-r border-[#e8e8f0]">
          <div className="font-[family-name:var(--font-heading)] text-4xl text-[#0F2162]">{s1.count}</div>
          <div className="text-[13px] text-[#5a5a72] mt-1.5">States covered</div>
        </div>
        <div ref={s2.ref} className="text-center py-7 px-6 md:border-r border-[#e8e8f0]">
          <div className="font-[family-name:var(--font-heading)] text-4xl text-[#0F2162]">&lt; {s2.count} hrs</div>
          <div className="text-[13px] text-[#5a5a72] mt-1.5">Avg completion time</div>
        </div>
        <div ref={s3.ref} className="text-center py-7 px-6 border-r border-[#e8e8f0]">
          <div className="font-[family-name:var(--font-heading)] text-4xl text-[#0F2162]">${s3.count}</div>
          <div className="text-[13px] text-[#5a5a72] mt-1.5">Per couple, all-inclusive</div>
        </div>
        <div className="text-center py-7 px-6">
          <div className="font-[family-name:var(--font-heading)] text-4xl text-[#0F2162]">100%</div>
          <div className="text-[13px] text-[#5a5a72] mt-1.5">Online — no office visits</div>
        </div>
      </div>
    </div>
  );
}

/* ── How It Works ──────────────────────────────────────────────────── */

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16" style={{ background: "#FAFAF7", padding: "96px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs font-bold tracking-[0.1em] uppercase text-[#0D8B8B] mb-3">Simple Process</div>
          <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[#071443] mb-3"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1 }}>
            Three steps to peace of mind
          </h2>
          <p className="text-lg text-[#5a5a72] max-w-[560px] mx-auto leading-relaxed">
            No complicated back-and-forth. No weeks of waiting. Just a clear path from yes to signed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((s, i) => (
            <div key={i} className="relative">
              {/* Dashed connector */}
              {i < 2 && (
                <div className="hidden md:block absolute top-9 z-0"
                  style={{
                    left: "calc(50% + 52px)", right: "calc(-50% + 52px)", height: 2,
                    background: "repeating-linear-gradient(90deg,#e8e8f0 0,#e8e8f0 8px,transparent 8px,transparent 16px)",
                  }}
                />
              )}
              <div className="bg-white border border-[#e8e8f0] rounded-[20px] p-9 h-full relative z-[1]">
                <div className="font-[family-name:var(--font-heading)] text-[56px] text-[#E84C88] opacity-25 leading-none mb-4">{s.n}</div>
                <h3 className="text-xl font-bold text-[#071443] mb-3 leading-tight">{s.title}</h3>
                <p className="text-[#5a5a72] text-[15px] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ───────────────────────────────────────────────────────── */

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16" style={{ background: "#fff", padding: "96px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs font-bold tracking-[0.1em] uppercase text-[#0D8B8B] mb-3">Transparent Pricing</div>
          <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[#071443] mb-3"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1 }}>
            One flat fee. No surprises.
          </h2>
          <p className="text-lg text-[#5a5a72] max-w-[560px] mx-auto leading-relaxed">
            Traditional attorneys charge $2,500&ndash;$10,000 per person. We charge $599 &mdash; total.
          </p>
        </div>

        {/* Comparison callout */}
        <div className="bg-[#FAFAF7] rounded-2xl px-7 py-5 flex flex-wrap items-center justify-between gap-4 mb-10 border border-[#e8e8f0]">
          <div className="text-[15px] text-[#5a5a72]">
            The average prenup attorney charges{" "}
            <strong className="text-[#071443]">$2,500&ndash;$10,000 per person.</strong>
          </div>
          <div className="text-[15px] font-bold text-[#0D8B8B]">OurPrenup: $599/couple. That&apos;s it.</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PRICING_PLANS.map((p, i) => (
            <div key={i} className="rounded-3xl p-9 flex flex-col relative"
              style={{
                background: p.featured ? "#071443" : "#fff",
                color: p.featured ? "#fff" : "#071443",
                border: p.featured ? "none" : "1px solid #e8e8f0",
                transform: p.featured ? "scale(1.03)" : "none",
                boxShadow: p.featured ? "0 20px 60px rgba(7,20,67,0.25)" : "none",
              }}>
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E84C88] text-white text-xs font-bold px-4 py-1 rounded-full">
                  {p.badge}
                </div>
              )}
              <div className="text-sm font-semibold mb-2" style={{ opacity: p.featured ? 0.6 : 0.5 }}>{p.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-[family-name:var(--font-heading)] text-5xl leading-none">{p.price}</span>
                <span className="text-sm" style={{ opacity: 0.6 }}>{p.per}</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 mt-2" style={{ opacity: p.featured ? 0.75 : 0.65 }}>{p.desc}</p>
              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <Check size={18} className={p.featured ? "text-green-400 shrink-0" : "text-[#0D8B8B] shrink-0"} />
                    <span className="text-sm leading-snug" style={{ opacity: p.featured ? 0.9 : 0.8 }}>{item}</span>
                  </li>
                ))}
              </ul>
              {p.href ? (
                <Link href={p.href}
                  className="flex items-center justify-center gap-2 text-white font-semibold text-[15px] py-3.5 rounded-full transition-opacity hover:opacity-90"
                  style={{ background: p.featured ? "#E84C88" : "#071443" }}>
                  Get Started <ArrowRight size={16} />
                </Link>
              ) : (
                <span className="flex items-center justify-center gap-2 text-white/60 font-semibold text-[15px] py-3.5 rounded-full"
                  style={{ background: p.featured ? "rgba(232,76,136,0.3)" : "rgba(7,20,67,0.3)" }}>
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── State Coverage Marquee ────────────────────────────────────────── */

function StateCoverage() {
  const row1 = ALL_STATE_NAMES.slice(0, 25);
  const row2 = ALL_STATE_NAMES.slice(25);

  return (
    <section style={{ background: "#FAFAF7", padding: "96px 0" }} className="overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center mb-12">
        <div className="text-xs font-bold tracking-[0.1em] uppercase text-[#0D8B8B] mb-3">50-State Coverage</div>
        <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[#071443] mb-3"
          style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1 }}>
          Wherever you call home,<br />we&apos;ve got you covered.
        </h2>
        <p className="text-lg text-[#5a5a72] max-w-[560px] mx-auto leading-relaxed">
          Our legal engine handles community property, equitable distribution, and every state&apos;s enforceability requirements.
        </p>
      </div>
      {[row1, row2].map((row, ri) => (
        <div key={ri} className="overflow-hidden mb-3.5" style={{ direction: ri === 1 ? "rtl" : "ltr" }}>
          <div className="flex gap-12 whitespace-nowrap"
            style={{
              animation: `marquee 28s linear infinite`,
              animationDirection: ri === 1 ? "reverse" : "normal",
            }}>
            {[...row, ...row].map((s, i) => (
              <div key={i} className="inline-flex items-center gap-1.5 bg-white border border-[#e8e8f0] rounded-full px-4 py-2 text-sm font-medium text-[#071443] shrink-0">
                <Check size={14} className="text-[#0D8B8B]" /> {s}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────────────── */

function TestimonialsSection() {
  return (
    <section style={{ background: "#fff", padding: "96px 0" }} className="overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="text-xs font-bold tracking-[0.1em] uppercase text-[#E84C88] mb-3">Real Feedback</div>
        <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[#071443]"
          style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1 }}>
          What couples are saying
        </h2>
      </div>
      <div className="flex gap-5 overflow-x-auto px-6 pb-2" style={{ scrollbarWidth: "thin" }}>
        {TESTIMONIALS.map((r, i) => (
          <div key={i} className="bg-white border border-[#e8e8f0] rounded-[20px] p-7 shrink-0 w-[340px]">
            <div className="flex gap-0.5 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className="fill-[#E84C88] text-[#E84C88]" />
              ))}
            </div>
            <p className="text-base text-[#071443] leading-relaxed mb-5">&ldquo;{r.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F0EFE9] shrink-0" />
              <div>
                <div className="text-sm font-semibold text-[#071443]">{r.name}</div>
                <div className="text-xs text-[#5a5a72]">{r.state}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────────────────── */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-16" style={{ background: "#FAFAF7", padding: "96px 0" }}>
      <div className="max-w-[780px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs font-bold tracking-[0.1em] uppercase text-[#E84C88] mb-3">Common Questions</div>
          <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-[#071443]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1 }}>
            Frequently asked questions
          </h2>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div key={i} className="border-b border-[#e8e8f0]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                className="w-full text-left flex items-center justify-between gap-4 py-5 text-[17px] font-semibold text-[#071443] cursor-pointer bg-transparent border-none">
                {f.q}
                <ChevronDown size={20} className={`shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? 400 : 0, opacity: open === i ? 1 : 0 }}>
                <p className="pb-5 text-base text-[#5a5a72] leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ────────────────────────────────────────────────────── */

function CTABanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#071443", padding: "96px 0" }}>
      <div className="absolute -top-[120px] -right-20 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: "rgba(232,76,136,0.1)" }} />
      <div className="absolute -bottom-20 -left-[60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "rgba(26,58,143,0.5)" }} />
      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-[1]">
        <h2 className="font-[family-name:var(--font-heading)] font-extrabold text-white mb-5"
          style={{ fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1.1 }}>
          You&apos;re writing your story together.<br />
          <em className="text-[#E84C88]">Start on the same page.</em>
        </h2>
        <p className="text-lg text-white/60 max-w-[480px] mx-auto mb-10 leading-relaxed">
          Your prenup can be ready today. Clarity over uncertainty.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/sign-up"
            className="inline-flex items-center gap-2 text-white font-semibold px-9 py-4 rounded-full transition-opacity hover:opacity-90"
            style={{ background: "#E84C88", fontSize: 16 }}>
            Start Your Prenup &mdash; $599
            <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-white font-semibold px-9 py-3.5 rounded-full border-2 border-white/40 hover:bg-white/[0.15] transition-colors cursor-pointer"
            style={{ fontSize: 16 }}>
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer style={{ background: "#06102e", color: "rgba(255,255,255,0.55)" }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="font-[family-name:var(--font-heading)] text-2xl text-white mb-4">OurPrenup</div>
            <p className="text-sm leading-relaxed max-w-[340px]">
              Modern prenuptial agreements for modern couples. Affordable, transparent, and legally sound &mdash; in every state.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.1em] uppercase text-white/40 mb-4">Product</div>
            <div className="flex flex-col gap-3">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Get Started", href: "/sign-up" },
              ].map(({ label, href }) => (
                <Link key={label} href={href} className="text-sm text-white/55 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.1em] uppercase text-white/40 mb-4">Legal</div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map(({ label, href }) => (
                <Link key={label} href={href} className="text-sm text-white/55 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.08] pt-8">
          <p className="text-xs leading-relaxed text-white/30 max-w-[680px] mb-3">
            OurPrenup provides self-help tools for creating prenuptial agreements. We are not a law firm and do not provide legal advice. Consult a licensed attorney in your state for legal advice specific to your situation.
          </p>
          <p className="text-xs text-white/25">&copy; {new Date().getFullYear()} OurPrenup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Pricing />
      <StateCoverage />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
      <Footer />
    </>
  );
}
