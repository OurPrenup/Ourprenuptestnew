"use client";

import { useState, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  FileText,
  BookOpen,
  PaperclipIcon,
  AlertCircle,
  CheckCircle,
  Square,
  Download,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { usePaymentStatus } from "@/lib/hooks/usePaymentStatus";
import ValidationPanel from "@/components/portal/ValidationPanel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GeneratedDocument {
  id: string;
  type: "prenup" | "summary" | "disclosure_exhibit";
  version: number;
  generatedAt: string;
}

const DOC_META: Record<
  string,
  { label: string; icon: typeof FileText; iconBg: string; iconColor: string }
> = {
  prenup: {
    label: "Prenuptial Agreement",
    icon: FileText,
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
  },
  summary: {
    label: "Plain Language Summary",
    icon: BookOpen,
    iconBg: "bg-purple/10",
    iconColor: "text-purple",
  },
  disclosure_exhibit: {
    label: "Financial Disclosure Exhibits",
    icon: PaperclipIcon,
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
  },
};

// ---------------------------------------------------------------------------
// Features (pre-generation display)
// ---------------------------------------------------------------------------

const features = [
  {
    icon: FileText,
    title: "Custom Prenuptial Agreement",
    description:
      "A legally-sound document tailored to your state, assets, and preferences.",
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
  },
  {
    icon: BookOpen,
    title: "Plain Language Summary",
    description:
      "An easy-to-read summary of your agreement's key terms.",
    iconBg: "bg-purple/10",
    iconColor: "text-purple",
  },
  {
    icon: PaperclipIcon,
    title: "Financial Disclosure Exhibits",
    description:
      "Attached schedules listing all disclosed assets and debts.",
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DocumentsPage() {
  const { hasPrenup: hasPaid, isLoading: paymentLoading } = usePaymentStatus();
  const [docs, setDocs] = useState<GeneratedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requirements = [
    "Prenup package purchased",
    "Questionnaire completed (both partners)",
    "Financial disclosure completed (both partners)",
    "All conflicts resolved",
  ];
  const hasDocuments = docs.length > 0;

  // Fetch existing documents
  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch("/api/documents");
      if (res.ok) {
        const data = await res.json();
        setDocs(data.documents ?? []);
      }
    } catch {
      // Silently fail — docs will show as not generated
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Generate documents
  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/documents/generate", { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate documents");
      }

      // Refresh document list
      await fetchDocuments();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setGenerating(false);
    }
  };

  // Download a document
  const handleDownload = (docId: string) => {
    window.open(`/api/documents/${docId}/pdf`, "_blank");
  };

  // Group docs by latest version
  const latestVersion = docs.reduce(
    (max, d) => Math.max(max, d.version),
    0
  );
  const latestDocs = docs.filter((d) => d.version === latestVersion);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-navy/40" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Your Documents
        </h1>
        <p className="text-text-secondary mt-2">
          {hasDocuments
            ? "Your prenuptial agreement has been generated. Download your documents below."
            : "Review, edit, and manage your prenuptial agreement."}
        </p>
      </div>

      {/* Error */}
      {error && (
        <Card>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-red-700 text-sm">
                Generation Failed
              </h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* ============================================================= */}
      {/* GENERATED DOCUMENTS — shown when documents exist               */}
      {/* ============================================================= */}
      {hasDocuments ? (
        <>
          {/* Success banner */}
          <Card>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-navy text-sm">
                  Documents Generated (Version {latestVersion})
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Generated on{" "}
                  {latestDocs[0]?.generatedAt
                    ? new Date(latestDocs[0].generatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        }
                      )
                    : ""}
                </p>
              </div>
            </div>
          </Card>

          {/* Document download cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestDocs.map((doc) => {
              const meta = DOC_META[doc.type] ?? DOC_META.prenup;
              const Icon = meta.icon;
              return (
                <Card key={doc.id} hover>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-10 h-10 rounded-full ${meta.iconBg} flex items-center justify-center`}
                      >
                        <Icon className={`w-5 h-5 ${meta.iconColor}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-navy">
                        {meta.label}
                      </h3>
                      <p className="text-xs text-text-secondary mt-1">
                        Version {doc.version}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(doc.id)}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Regenerate option */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-navy text-sm">
                  Need to make changes?
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Update your questionnaire answers, then regenerate your
                  documents. Previous versions are preserved.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                {generating ? "Generating..." : "Regenerate"}
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <>
          {/* =========================================================== */}
          {/* PRE-GENERATION — shown when no documents exist               */}
          {/* =========================================================== */}

          {/* Status Card */}
          <Card>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-navy text-sm">
                  Document Not Yet Generated
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Your prenup hasn&apos;t been generated yet. Complete all
                  questionnaire steps and financial disclosure first.
                </p>
              </div>
            </div>
          </Card>

          {/* What You'll Get */}
          <div>
            <h2 className="text-xl font-semibold text-navy mb-4">
              What you&apos;ll get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature) => (
                <Card key={feature.title} hover>
                  <div className="space-y-3">
                    <div
                      className={`w-10 h-10 rounded-full ${feature.iconBg} flex items-center justify-center`}
                    >
                      <feature.icon
                        className={`w-5 h-5 ${feature.iconColor}`}
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-navy">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Legal Validation */}
          <ValidationPanel autoFetch compact />

          {/* Requirements Checklist */}
          <Card>
            <h2 className="text-lg font-semibold text-navy mb-4">
              Ready to generate?
            </h2>
            <p className="text-sm text-text-secondary mb-4">
              Make sure the following are done before generating your prenup:
            </p>
            <div className="space-y-3">
              {requirements.map((req) => (
                <div key={req} className="flex items-center gap-3">
                  <Square className="w-4 h-4 text-text-secondary/40 shrink-0" />
                  <span className="text-sm text-navy/70">{req}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button
                variant="primary"
                disabled={generating || paymentLoading}
                onClick={handleGenerate}
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  "Generate Prenup"
                )}
              </Button>
              <p className="text-xs text-text-secondary mt-2">
                We&apos;ll check all requirements and let you know if anything is missing.
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
