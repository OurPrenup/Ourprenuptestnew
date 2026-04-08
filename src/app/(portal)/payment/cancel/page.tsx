"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="max-w-lg mx-auto py-12">
      <Card>
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8 text-coral" />
          </div>
          <h1 className="text-2xl font-semibold text-navy font-[family-name:var(--font-heading)]">
            Payment Cancelled
          </h1>
          <p className="text-text-secondary max-w-sm mx-auto">
            No worries — you weren&apos;t charged. You can come back and
            purchase anytime.
          </p>
          <div className="pt-4">
            <Link href="/payment">
              <Button variant="primary" size="md">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Plans
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
