"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Heart, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

/** Only allow hex characters and hyphens in tokens (matches crypto.randomBytes output). */
function isValidToken(token: string): boolean {
  return /^[a-zA-Z0-9-]+$/.test(token) && token.length > 0 && token.length <= 128;
}

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const rawToken = searchParams.get("token");
  const token = rawToken && isValidToken(rawToken) ? rawToken : null;
  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");
  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    async function validateToken() {
      try {
        const res = await fetch(`/api/invite/validate?token=${encodeURIComponent(token!)}`);
        if (res.ok) {
          const data = await res.json();
          setSenderName(data.senderName || "Your partner");
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    }

    validateToken();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-navy mx-auto" />
        <p className="text-text-secondary mt-4">Loading invitation...</p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <Card>
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-coral" />
          </div>
          <h1 className="text-2xl font-semibold text-navy">Invalid Invitation</h1>
          <p className="text-text-secondary max-w-sm mx-auto">
            This invitation link is invalid, expired, or has already been used.
            Ask your partner to send a new one.
          </p>
        </div>
      </Card>
    );
  }

  // Valid — show accept screen (no API call here, just pass the token through)
  return (
    <Card>
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink/10 flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-pink" />
        </div>
        <h1 className="text-2xl font-semibold text-navy">
          {senderName} Invited You
        </h1>
        <p className="text-text-secondary max-w-sm mx-auto">
          {senderName} wants to create a prenuptial agreement together on
          OurPrenup. Create an account to get started.
        </p>
        <div className="pt-4 flex gap-3 justify-center">
          <Link href={`/sign-up?invite_token=${encodeURIComponent(token!)}`}>
            <Button variant="primary" size="md">
              Accept &amp; Create Account
            </Button>
          </Link>
        </div>
        <p className="text-xs text-text-secondary">
          Already have an account?{" "}
          <Link href={`/sign-in?invite_token=${encodeURIComponent(token!)}`} className="text-navy font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default function AcceptInvitePage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-navy font-[family-name:var(--font-heading)]">
            OurPrenup
          </h2>
        </div>
        <Suspense
          fallback={
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-navy mx-auto" />
            </div>
          }
        >
          <AcceptInviteContent />
        </Suspense>
      </div>
    </div>
  );
}
