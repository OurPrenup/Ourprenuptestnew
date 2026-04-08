"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function CompleteInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "accepted" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No invite token found. Please use the link from your invitation email.");
      return;
    }

    async function acceptInvite() {
      try {
        const res = await fetch("/api/invite/accept", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("accepted");
        } else {
          const data = await res.json().catch(() => ({}));
          setStatus("error");
          if (res.status === 409) {
            setErrorMessage("You are already part of another couple. Please contact support if this is an error.");
          } else if (res.status === 410) {
            setErrorMessage("This invitation has already been accepted.");
          } else {
            setErrorMessage(data.error || "Something went wrong. Please try again.");
          }
        }
      } catch {
        setStatus("error");
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    }

    acceptInvite();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-navy mx-auto" />
        <p className="text-text-secondary mt-4">Linking your account...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <Card>
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-coral" />
          </div>
          <h1 className="text-2xl font-semibold text-navy">Something Went Wrong</h1>
          <p className="text-text-secondary max-w-sm mx-auto">
            {errorMessage}
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

  // Accepted
  return (
    <Card>
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-2xl font-semibold text-navy">
          You&apos;re Connected!
        </h1>
        <p className="text-text-secondary max-w-sm mx-auto">
          Your accounts are now linked. You can both fill out the
          questionnaire independently — any differences will be flagged for
          discussion.
        </p>
        <div className="pt-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function CompleteInvitePage() {
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
          <CompleteInviteContent />
        </Suspense>
      </div>
    </div>
  );
}
