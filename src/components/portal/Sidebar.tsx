"use client";

import { cn } from "@/lib/utils";
import { useClerkSafe } from "@/lib/hooks/useClerkSafe";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  DollarSign,
  Users,
  FileText,
  Scale,
  Stamp,
  CreditCard,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";
import QuestionnaireSidebar from "./QuestionnaireSidebar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ClipboardList, label: "Questionnaire", href: "/questionnaire/introduction" },
  { icon: DollarSign, label: "Financials", href: "/financial-disclosure" },
  { icon: Users, label: "Collaborate", href: "/collaboration" },
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: Scale, label: "Attorney", href: "/attorney" },
  { icon: Stamp, label: "E-Sign", href: "/review-notarize" },
];

const bottomItems = [
  { icon: CreditCard, label: "Payment", href: "/payment" },
  { icon: HelpCircle, label: "Help", href: "/help" },
  { icon: User, label: "Account", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const { signOut } = useClerkSafe();
  const isQuestionnaire = pathname.startsWith("/questionnaire");

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border z-40",
        "flex flex-col transition-all duration-200 ease-in-out",
        expanded ? "w-60" : "w-20"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border px-4">
        <span
          className={cn(
            "font-bold text-navy text-lg font-[family-name:var(--font-heading)] transition-opacity",
            expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          )}
        >
          OurPrenup
        </span>
        {!expanded && (
          <span className="font-bold text-navy text-xl font-[family-name:var(--font-heading)]">
            OP
          </span>
        )}
      </div>

      {isQuestionnaire ? (
        /* Questionnaire step tracker mode */
        <div className="flex-1 py-4 flex flex-col">
          <QuestionnaireSidebar expanded={expanded} pathname={pathname} />
        </div>
      ) : (
        <>
          {/* Main Nav */}
          <nav className="flex-1 py-4 space-y-1 px-3">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 h-12 rounded-[12px] transition-colors group",
                    expanded ? "px-3" : "justify-center",
                    isActive
                      ? "bg-navy text-white"
                      : "text-navy hover:bg-navy/5"
                  )}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  {expanded && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-border py-4 space-y-1 px-3">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 h-10 rounded-[12px] transition-colors",
                    expanded ? "px-3" : "justify-center",
                    isActive
                      ? "bg-navy text-white"
                      : "text-text-secondary hover:text-navy hover:bg-navy/5"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {expanded && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className={cn(
                "flex items-center gap-3 h-10 w-full rounded-[12px] transition-colors text-text-secondary hover:text-coral hover:bg-coral/5",
                expanded ? "px-3" : "justify-center"
              )}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {expanded && (
                <span className="text-sm font-medium whitespace-nowrap">
                  Sign Out
                </span>
              )}
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
