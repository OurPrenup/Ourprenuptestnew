"use client";

import Card from "@/components/ui/Card";
import { useUserSafe } from "@/lib/hooks/useClerkSafe";
import {
  User,
  Calendar,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded } = useUserSafe();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-navy/40" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Your Account
        </h1>
        <p className="text-text-secondary mt-2">
          View your profile information.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
            <User className="w-5 h-5 text-navy" />
          </div>
          <h2 className="text-lg font-semibold text-navy">
            Profile Information
          </h2>
        </div>
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-navy/70 mb-1">Name</label>
            <p className="text-base text-navy-dark">{user?.fullName || "Not set"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy/70 mb-1">Email</label>
            <p className="text-base text-navy-dark">{user?.primaryEmailAddress?.emailAddress || "Not set"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy/70 mb-1">Account created</label>
            <p className="text-base text-navy-dark">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown"}
            </p>
          </div>
        </div>
      </Card>

      {/* Wedding Countdown */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-coral" />
          </div>
          <h2 className="text-lg font-semibold text-navy">
            Wedding Countdown
          </h2>
        </div>
        <div className="text-center py-6">
          <p className="text-4xl font-bold text-navy-dark">--- days</p>
          <p className="text-sm text-text-secondary mt-2">
            until your wedding!
          </p>
          <p className="text-xs text-text-secondary mt-1">
            Set your wedding date in the questionnaire to see the countdown.
          </p>
        </div>
      </Card>

      {/* Account management link */}
      <Card>
        <h2 className="text-lg font-semibold text-navy mb-2">
          Account Settings
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          To change your password, update your email, or manage your account,
          use the account management portal.
        </p>
        <a
          href="/user"
          className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline"
        >
          Manage account settings →
        </a>
      </Card>
    </div>
  );
}
