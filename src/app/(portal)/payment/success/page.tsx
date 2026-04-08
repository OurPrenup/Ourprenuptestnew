"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CheckCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"verifying" | "confirmed" | "failed" | "pending">(
    sessionId ? "verifying" : "failed"
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;

    async function verify() {
      try {
        const res = await fetch(`/api/payments/verify?session_id=${sessionId}`);
        if (cancelled) return;

        if (res.ok) {
          const data = await res.json();

          if (data.status === "completed") {
            setStatus("confirmed");
            return;
          }

          if (data.status === "failed") {
            setStatus("failed");
            return;
          }

          // Still pending — poll every 2 seconds
          intervalRef.current = setInterval(async () => {
            try {
              const r = await fetch(`/api/payments/verify?session_id=${sessionId}`);
              if (cancelled) return;
              if (r.ok) {
                const d = await r.json();
                if (d.status === "completed") {
                  setStatus("confirmed");
                  if (intervalRef.current) clearInterval(intervalRef.current);
                } else if (d.status === "failed") {
                  setStatus("failed");
                  if (intervalRef.current) clearInterval(intervalRef.current);
                }
              }
            } catch {
              // Keep polling
            }
          }, 2000);

          // Stop polling after 30 seconds — show honest "still pending" message
          setTimeout(() => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            if (!cancelled) {
              setStatus((prev) => (prev === "verifying" ? "pending" : prev));
            }
          }, 30000);
        } else {
          if (!cancelled) setStatus("failed");
        }
      } catch {
        if (!cancelled) setStatus("failed");
      }
    }

    verify();

    // Cleanup: clear interval and mark as cancelled on unmount
    return () => {
      cancelled = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [sessionId]);

  if (status === "verifying") {
    return (
      <Card>
        <div className="text-center py-8 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-navy mx-auto" />
          <h1 className="text-2xl font-semibold text-navy font-[family-name:var(--font-heading)]">
            Confirming Your Payment...
          </h1>
          <p className="text-text-secondary max-w-sm mx-auto">
            Please wait while we verify your payment with Stripe.
          </p>
        </div>
      </Card>
    );
  }

  if (status === "failed") {
    return (
      <Card>
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-coral" />
          </div>
          <h1 className="text-2xl font-semibold text-navy font-[family-name:var(--font-heading)]">
            Payment Not Found
          </h1>
          <p className="text-text-secondary max-w-sm mx-auto">
            We couldn&apos;t verify this payment. If you were charged, please
            contact support and we&apos;ll sort it out.
          </p>
          <div className="pt-4">
            <Link href="/dashboard">
              <Button variant="secondary" size="md">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  if (status === "pending") {
    return (
      <Card>
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-semibold text-navy font-[family-name:var(--font-heading)]">
            Still Confirming Your Payment
          </h1>
          <p className="text-text-secondary max-w-sm mx-auto">
            We&apos;re still waiting for confirmation from our payment processor.
            This can take a few minutes. Please check your dashboard shortly — your
            access will be unlocked automatically once confirmed.
          </p>
          <p className="text-xs text-text-secondary">
            If you were charged but don&apos;t see access within 10 minutes, please
            contact support.
          </p>
          <div className="pt-4">
            <Link href="/dashboard">
              <Button variant="secondary" size="md">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-2xl font-semibold text-navy font-[family-name:var(--font-heading)]">
          Payment Successful!
        </h1>
        <p className="text-text-secondary max-w-sm mx-auto">
          Your purchase is confirmed. You now have full access to complete your
          prenuptial agreement.
        </p>
        <p className="text-xs text-text-secondary">
          A receipt has been sent to your email.
        </p>
        <div className="pt-4">
          <Link href="/dashboard">
            <Button variant="primary" size="md">
              Continue to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="max-w-lg mx-auto py-12">
      <Suspense
        fallback={
          <Card>
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-navy mx-auto" />
            </div>
          </Card>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
