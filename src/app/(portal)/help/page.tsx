"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  BookOpen,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    q: "Is this legally binding?",
    a: "Yes — when completed correctly and signed in accordance with your state\u2019s legal requirements, the prenup you create here is legally binding. We provide the framework and guidance to help you build a prenup that holds up in court.",
  },
  {
    q: "Is this suitable for all states?",
    a: "Yes — our platform is designed to align with the general principles of U.S. prenup law. We also provide guidance tailored to state-specific requirements where relevant.",
  },
  {
    q: "Can we both fill it out together?",
    a: "Yes — and we recommend it! Our builder is designed to be collaborative. You\u2019ll go through the questions together, with helpful explanations and suggestions to guide the conversation. Each partner fills out independently, then you resolve any differences.",
  },
  {
    q: "What happens after we complete the prenup?",
    a: "Once you\u2019re done, you\u2019ll get a downloadable, legally-sound document that\u2019s ready to sign. Depending on your state, you may wish to have it notarized and reviewed by separate attorneys.",
  },
  {
    q: "How long does it take to complete?",
    a: "Most couples complete the full questionnaire in under 45 minutes. You can save your progress and come back anytime — there\u2019s no rush.",
  },
  {
    q: "What if we already have a prenup template?",
    a: "Our platform doesn\u2019t use static templates. Each agreement is built dynamically based on your answers, your state, and your financial situation. This gives you a customized prenup that reflects your real life.",
  },
  {
    q: "Can I use this if I\u2019m already married?",
    a: "Not for a prenup — but postnuptial agreements (postnups) work similarly and are signed after marriage. We\u2019re working on offering that too.",
  },
  {
    q: "How is this different from hiring a lawyer?",
    a: "Hiring a lawyer for a prenup can cost thousands and involves back-and-forth between attorneys. Our platform simplifies the process, guiding both partners through key questions with fairness and clarity at a fraction of the cost.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Help & Support
        </h1>
        <p className="text-text-secondary mt-2">
          Find answers to common questions or get in touch with our team.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-6 hover:shadow-card-hover transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-teal" />
          </div>
          <h3 className="text-sm font-semibold text-navy">Live Chat</h3>
          <p className="text-xs text-text-secondary mt-1">
            Chat with our AI assistant for instant help
          </p>
        </Card>
        <Card className="text-center p-6 hover:shadow-card-hover transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6 text-purple" />
          </div>
          <h3 className="text-sm font-semibold text-navy">Email Support</h3>
          <p className="text-xs text-text-secondary mt-1">
            support@ourprenup.com
          </p>
        </Card>
        <Card className="text-center p-6 hover:shadow-card-hover transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-pink" />
          </div>
          <h3 className="text-sm font-semibold text-navy">Learning Center</h3>
          <p className="text-xs text-text-secondary mt-1">
            Articles and guides about prenups
          </p>
        </Card>
      </div>

      {/* FAQ */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-navy" />
          <h2 className="text-xl font-semibold text-navy">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-base font-medium text-navy pr-4">
                  {faq.q}
                </span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-text-secondary shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-text-secondary shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
