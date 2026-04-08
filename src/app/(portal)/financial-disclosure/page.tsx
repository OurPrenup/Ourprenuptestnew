"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2, Check, AlertCircle } from "lucide-react";
import { useProgress } from "@/lib/ProgressContext";

interface DisclosureItem {
  id: string;
  description: string;
  value: string;
  owner: string;
}

interface CategoryState {
  items: DisclosureItem[];
  expanded: boolean;
}

const categories = [
  {
    key: "accounts",
    label: "ACCOUNTS",
    description: "Savings, stocks, bonds, cash, checking accounts, etc.",
    icon: "🏦",
  },
  {
    key: "assets",
    label: "ASSETS",
    description: "IRAs, mutual funds, jewelry, home furnishings, cryptocurrency, etc.",
    icon: "💎",
  },
  {
    key: "income",
    label: "INCOME",
    description: "Gross income for the past 3 years",
    icon: "💰",
    isIncome: true,
  },
  {
    key: "real_estate",
    label: "REAL ESTATE",
    description: "Primary residence, vacation homes, rental properties, land",
    icon: "🏠",
  },
  {
    key: "vehicles",
    label: "VEHICLES",
    description: "Cars, motorcycles, boats, recreational vehicles",
    icon: "🚗",
  },
  {
    key: "business",
    label: "BUSINESS OWNERSHIP",
    description: "Ownership interests in sole proprietorships, partnerships, corporations, or LLCs",
    icon: "🏢",
  },
  {
    key: "debts",
    label: "DEBTS & LIABILITIES",
    description: "Credit card debt, student loans, personal loans, mortgages, etc.",
    icon: "📋",
  },
  {
    key: "inheritance",
    label: "POTENTIAL INHERITANCE",
    description: "Expected inheritances from family members or estates",
    icon: "🎁",
  },
  {
    key: "trusts",
    label: "TRUSTS",
    description: "Expected or existing trusts",
    icon: "📜",
  },
];

const currentYear = new Date().getFullYear();

export default function FinancialDisclosurePage() {
  const [activeTab, setActiveTab] = useState<"yours" | "partner">("yours");
  const [data, setData] = useState<Record<string, CategoryState>>(
    Object.fromEntries(
      categories.map((c) => [c.key, { items: [], expanded: false }])
    )
  );
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ description: "", value: "" });
  const [incomeData, setIncomeData] = useState([
    { year: currentYear, amount: "", owner: "You" },
    { year: currentYear - 1, amount: "", owner: "You" },
    { year: currentYear - 2, amount: "", owner: "You" },
  ]);

  const { completeStep } = useProgress();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoadedRef = useRef(false);
  const changeCountRef = useRef(0);

  // Load from API on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/financial-disclosure");
        if (res.ok) {
          const { data: apiData } = await res.json();
          if (!cancelled && apiData && Object.keys(apiData).length > 0) {
            if (apiData.categories) setData(apiData.categories);
            if (apiData.incomeData) setIncomeData(apiData.incomeData);
          }
        }
      } catch {
        // Fall back to defaults
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          hasLoadedRef.current = true;
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Auto-save function
  const saveToApi = useCallback(async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/financial-disclosure", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { categories: data, incomeData } }),
      });
      if (!res.ok) throw new Error("Save failed");
    } catch {
      setSaveError("Save failed");
    } finally {
      setIsSaving(false);
    }
  }, [data, incomeData]);

  // Debounced auto-save
  useEffect(() => {
    if (!hasLoadedRef.current) return;
    changeCountRef.current++;
    if (changeCountRef.current <= 1) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(saveToApi, 2000);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [data, incomeData, saveToApi]);

  const handleMarkComplete = async () => {
    await saveToApi();
    try {
      await fetch("/api/financial-disclosure/complete", { method: "POST" });
      completeStep("financial-disclosure");
    } catch {
      setSaveError("Failed to mark complete");
    }
  };

  const toggleCategory = (key: string) => {
    setData((prev) => ({
      ...prev,
      [key]: { ...prev[key], expanded: !prev[key].expanded },
    }));
  };

  const addItem = (categoryKey: string) => {
    if (!newItem.description || !newItem.value) return;
    setData((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        items: [
          ...prev[categoryKey].items,
          {
            id: Date.now().toString(),
            description: newItem.description,
            value: newItem.value,
            owner: activeTab === "yours" ? "You" : "Partner",
          },
        ],
      },
    }));
    setNewItem({ description: "", value: "" });
    setAddingTo(null);
  };

  const removeItem = (categoryKey: string, itemId: string) => {
    setData((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        items: prev[categoryKey].items.filter((i) => i.id !== itemId),
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-9 w-72 bg-navy/10 rounded-lg" />
        <div className="h-5 w-48 bg-navy/5 rounded-lg" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-[16px] border border-border p-6 h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
            Financial Disclosure
          </h1>
          <span className="flex items-center gap-1.5 text-xs">
            {saveError ? (
              <><AlertCircle className="w-3.5 h-3.5 text-coral" /><span className="text-coral">Save failed</span></>
            ) : isSaving ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin text-text-secondary" /><span className="text-text-secondary">Saving...</span></>
            ) : (
              <><Check className="w-3.5 h-3.5 text-green-600" /><span className="text-green-600">Saved</span></>
            )}
          </span>
        </div>
        <p className="text-text-secondary mt-2">
          Disclose all of your finances below
        </p>
      </div>

      {/* Important Notice */}
      <div className="rounded-[12px] bg-teal/10 border border-teal/20 p-5">
        <div className="flex items-start gap-3">
          <span className="text-teal text-lg">ℹ</span>
          <div>
            <h3 className="font-bold text-navy text-sm">Important</h3>
            <p className="text-sm text-navy/80 mt-1">
              This is one of the most important parts of your prenuptial agreement. Leaving out any property could invalidate the entire agreement, so take your time and make sure to disclose everything you own and owe.
            </p>
            <p className="text-sm text-navy/80 mt-2 font-medium">
              This is not optional, so take your time and make sure to disclose everything you own &amp; owe.
            </p>
          </div>
        </div>
      </div>

      {/* Separate Property Section */}
      <div>
        <h2 className="text-xl font-semibold text-navy mb-1">Separate Property</h2>
        <p className="text-text-secondary text-sm mb-4">
          Enter all of the property that you or your partner own individually
        </p>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("yours")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "yours"
                ? "border-teal text-teal"
                : "border-transparent text-text-secondary hover:text-navy"
            }`}
          >
            Your Property
          </button>
          <button
            onClick={() => setActiveTab("partner")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "partner"
                ? "border-teal text-teal"
                : "border-transparent text-text-secondary hover:text-navy"
            }`}
          >
            Partner&apos;s Property
          </button>
        </div>

        {/* Category Cards */}
        <div className="space-y-4">
          {categories.map((cat) => (
            <Card key={cat.key}>
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-navy">{cat.label}</h3>
                      <p className="text-xs text-text-secondary">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {data[cat.key].items.length > 0 && (
                      <button
                        onClick={() => toggleCategory(cat.key)}
                        className="p-1 text-text-secondary hover:text-navy"
                      >
                        {data[cat.key].expanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    {cat.isIncome ? null : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setAddingTo(addingTo === cat.key ? null : cat.key);
                          setNewItem({ description: "", value: "" });
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>

                {/* Income special display */}
                {cat.isIncome && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-text-secondary uppercase">
                      <span>Year</span>
                      <span>Amount</span>
                      <span>Owner</span>
                    </div>
                    {incomeData.map((row, idx) => (
                      <div key={row.year} className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm text-navy">{row.year}</span>
                        <Input
                          value={row.amount}
                          onChange={(e) => {
                            const updated = [...incomeData];
                            updated[idx].amount = e.target.value;
                            setIncomeData(updated);
                          }}
                          placeholder="$0.00"
                        />
                        <span className="text-sm text-navy bg-navy/5 px-2 py-1 rounded-full text-center w-fit">
                          {activeTab === "yours" ? "You" : "Partner"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Items List */}
                {data[cat.key].items.length > 0 && (data[cat.key].expanded || data[cat.key].items.length <= 3) && (
                  <div className="space-y-2 border-t border-border pt-3">
                    {data[cat.key].items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-bg rounded-lg">
                        <div className="flex-1">
                          <span className="text-sm text-navy font-medium">{item.description}</span>
                          <span className="text-sm text-text-secondary ml-3">${item.value}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-navy bg-navy/5 px-2 py-0.5 rounded-full">
                            {item.owner}
                          </span>
                          <button
                            onClick={() => removeItem(cat.key, item.id)}
                            className="p-1 text-text-secondary hover:text-coral transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data[cat.key].items.length > 3 && !data[cat.key].expanded && (
                  <button
                    onClick={() => toggleCategory(cat.key)}
                    className="text-sm text-teal hover:underline"
                  >
                    Show all {data[cat.key].items.length} items
                  </button>
                )}

                {/* Add Item Form */}
                {addingTo === cat.key && !cat.isIncome && (
                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Description"
                        value={newItem.description}
                        onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="e.g. Checking account at Chase"
                      />
                      <Input
                        label="Estimated Value"
                        value={newItem.value}
                        onChange={(e) => setNewItem((prev) => ({ ...prev, value: e.target.value }))}
                        placeholder="e.g. 25000"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm" onClick={() => addItem(cat.key)}>
                        Save
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setAddingTo(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Jointly Owned Property */}
      <div>
        <h2 className="text-xl font-semibold text-navy mb-1">Jointly Owned Property</h2>
        <p className="text-text-secondary text-sm mb-4">
          List all property you and your partner own together prior to marriage
        </p>
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤝</span>
              <div>
                <h3 className="text-sm font-bold text-navy">Shared Assets</h3>
                <p className="text-xs text-text-secondary">
                  i.e. property, vehicles, furniture, shared bank accounts
                </p>
              </div>
            </div>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </Card>
      </div>

      {/* Mark Complete */}
      <Card>
        <div className="text-center py-4">
          <h3 className="text-lg font-semibold text-navy">Financial Disclosure Complete?</h3>
          <p className="text-sm text-text-secondary mt-1">
            If all of your and your partner&apos;s property has been disclosed, you may now mark this as complete
          </p>
          <Button variant="primary" size="lg" className="mt-4" onClick={handleMarkComplete}>
            Mark as Complete
          </Button>
        </div>
      </Card>
    </div>
  );
}
