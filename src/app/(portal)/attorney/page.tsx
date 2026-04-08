"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Scale,
  ShieldCheck,
  BookOpen,
  MessageCircle,
  AlertTriangle,
  Video,
  FileCheck,
  Award,
  Check,
} from "lucide-react";

const reasons = [
  "Adds enforceability to your agreement",
  "Ensures you understand all terms and implications",
  "Provides personalized legal advice for your situation",
  "Recommended when waiving spousal support or with complex finances",
];

const singleIncludes = [
  "1:1 meeting with licensed attorney",
  "Full document review",
  "Certificate of Independent Legal Review",
];

const bothIncludes = [
  "Everything in single review, for both partners",
  "Separate independent attorneys for each",
];

const howItWorks = [
  {
    step: 1,
    icon: ShieldCheck,
    title: "Purchase Attorney Review",
    description: "Choose single or both-partner review.",
  },
  {
    step: 2,
    icon: Scale,
    title: "Get Matched",
    description:
      "We match you with a licensed family law attorney in your state.",
  },
  {
    step: 3,
    icon: Video,
    title: "Schedule Consultation",
    description: "Schedule a 1:1 video consultation at a time that works for you.",
  },
  {
    step: 4,
    icon: FileCheck,
    title: "Document Review",
    description: "Attorney reviews your prenup and provides feedback.",
  },
  {
    step: 5,
    icon: Award,
    title: "Receive Certificate",
    description:
      "Receive your Certificate of Independent Legal Review.",
  },
];

export default function AttorneyPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Attorney Services
        </h1>
        <p className="text-text-secondary mt-2">
          Connect with a licensed family law attorney in your state for
          independent review.
        </p>
      </div>

      {/* Why Get Attorney Review */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5 text-purple" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-navy">
              Why get attorney review?
            </h2>
            <ul className="mt-3 space-y-2">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span className="text-sm text-navy/80">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card hover>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-navy">
              Single Partner Review
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-navy-dark">$699</span>
            </div>
            <ul className="space-y-2">
              {singleIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                  <span className="text-sm text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full">
              Select
            </Button>
          </div>
        </Card>

        <Card hover className="border-2 border-teal/30">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-navy">
                Both Partners
              </h3>
              <span className="text-xs font-bold text-teal bg-teal/10 px-2 py-1 rounded-full uppercase">
                Recommended
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-navy-dark">
                $1,398
              </span>
            </div>
            <ul className="space-y-2">
              {bothIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                  <span className="text-sm text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full">
              Select
            </Button>
          </div>
        </Card>
      </div>

      {/* How It Works */}
      <div>
        <h2 className="text-xl font-semibold text-navy mb-4">How it works</h2>
        <div className="space-y-4">
          {howItWorks.map((item) => (
            <Card key={item.step}>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center shrink-0 text-sm font-bold text-navy">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card>
        <div className="text-center py-4">
          <h3 className="text-lg font-semibold text-navy">
            Ready to get started?
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Connect with a licensed attorney for independent review of your
            prenuptial agreement.
          </p>
          <Button variant="primary" size="lg" className="mt-4">
            Get Started
          </Button>
        </div>
      </Card>
    </div>
  );
}
