"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Heart,
  Mail,
  Send,
  CheckCircle,
  Clock,
  UserPlus,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function InvitePage() {
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coupleId, setCoupleId] = useState<string | null>(null);

  // Get the couple ID on mount
  useEffect(() => {
    async function loadCouple() {
      try {
        const res = await fetch("/api/couples", { method: "POST" });
        if (res.ok) {
          const { couple } = await res.json();
          setCoupleId(couple?.id || null);
        }
      } catch {
        // Will show error when they try to send
      }
    }
    loadCouple();
  }, []);

  const handleSend = async () => {
    if (!partnerEmail || !partnerName) return;
    if (!coupleId) {
      setError("Account setup not complete. Try refreshing the page.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const res = await fetch(`/api/couples/${coupleId}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerName, partnerEmail }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send invitation");
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const handleResend = () => {
    setSent(false);
    // They can re-submit the form to resend
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Invite Your Partner
        </h1>
        <p className="text-text-secondary mt-2">
          Your future spouse will receive an email inviting them to create your
          prenup together.
        </p>
      </div>

      {/* Info Banner */}
      <div className="rounded-[12px] bg-gradient-to-br from-teal/5 via-teal/10 to-navy/5 border border-teal/20 p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0 mt-0.5">
            <Heart className="w-4 h-4 text-teal" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-navy mb-1">
              Why invite your partner?
            </h3>
            <p className="text-sm text-navy/70 leading-relaxed">
              A prenuptial agreement works best when both partners are involved
              from the start. Your partner will get their own account to fill out
              the questionnaire independently. Any differences in your answers
              will be flagged so you can discuss and resolve them together.
            </p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-[12px] bg-coral/10 border border-coral/20 p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-coral shrink-0" />
          <p className="text-sm text-coral">{error}</p>
        </div>
      )}

      {!sent ? (
        <Card>
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-pink/10 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-navy" />
              </div>
              <h3 className="text-lg font-semibold text-navy">
                Partner Details
              </h3>
            </div>

            <Input
              id="partner-name"
              label="Partner&apos;s Full Name"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Enter your partner&apos;s name"
              required
            />

            <Input
              id="partner-email"
              label="Partner&apos;s Email Address"
              type="email"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              placeholder="partner@email.com"
              required
            />

            <div className="pt-2">
              <Button
                variant={partnerEmail && partnerName && !sending ? "primary" : "disabled"}
                size="md"
                disabled={!partnerEmail || !partnerName || sending}
                onClick={handleSend}
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Invitation
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-navy">
              Invitation Sent!
            </h3>
            <p className="text-text-secondary max-w-md mx-auto">
              We&apos;ve sent an invitation to{" "}
              <span className="font-medium text-navy">{partnerName}</span> at{" "}
              <span className="font-medium text-navy">{partnerEmail}</span>.
              They&apos;ll receive an email with instructions to create their
              account.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary mt-4">
              <Clock className="w-4 h-4" />
              <span>Waiting for partner to accept...</span>
            </div>

            <div className="pt-4 flex gap-3 justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResend}
              >
                <Mail className="w-4 h-4 mr-2" />
                Resend Invite
              </Button>
              <Button variant="primary" size="sm" onClick={() => window.location.href = "/dashboard"}>
                  Back to Dashboard
                </Button>
            </div>
          </div>
        </Card>
      )}

      {/* What happens next */}
      <Card>
        <h3 className="text-lg font-semibold text-navy mb-4">
          What happens after your partner joins?
        </h3>
        <div className="space-y-4">
          {[
            {
              step: "1",
              title: "They create their account",
              desc: "Your partner signs up and gets access to the same questionnaire.",
            },
            {
              step: "2",
              title: "Both of you fill out questions independently",
              desc: "Each partner answers the questionnaire on their own — no peeking!",
            },
            {
              step: "3",
              title: "We flag any differences",
              desc: "Our system identifies areas where your answers don\u2019t match.",
            },
            {
              step: "4",
              title: "You resolve together",
              desc: "Use our Collaboration Station to discuss and agree on final terms.",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-navy/10 text-navy text-sm font-bold flex items-center justify-center shrink-0">
                {item.step}
              </span>
              <div>
                <p className="text-sm font-medium text-navy">{item.title}</p>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
