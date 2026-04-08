"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  User,
  Users,
  Calendar,
  KeyRound,
  Download,
  Trash2,
} from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Nick");
  const [email, setEmail] = useState("nick@example.com");
  const [phone, setPhone] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Your Account
        </h1>
        <p className="text-text-secondary mt-2">
          Manage your profile and account settings.
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
          <Input
            id="fullName"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="phone"
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            helperText="Optional"
          />
          <Button variant="primary" size="sm">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Partner Info */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-pink/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-pink" />
          </div>
          <h2 className="text-lg font-semibold text-navy">
            Partner Information
          </h2>
        </div>
        <div className="space-y-4 max-w-lg">
          <Input
            id="partnerName"
            label="Partner Name"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Enter your partner&apos;s name"
          />
          <Input
            id="partnerEmail"
            label="Partner Email"
            type="email"
            value={partnerEmail}
            onChange={(e) => setPartnerEmail(e.target.value)}
            placeholder="Enter your partner&apos;s email"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-navy font-medium">
              Invite Status:
            </span>
            <span className="text-xs font-bold text-warning bg-warning/10 px-2.5 py-1 rounded-full uppercase">
              Pending
            </span>
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
            Set your wedding date to see the countdown.
          </p>
        </div>
      </Card>

      {/* Account Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-navy mb-4">
          Account Actions
        </h2>
        <div className="space-y-3">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-bg transition-colors text-left">
            <KeyRound className="w-4 h-4 text-navy" />
            <span className="text-sm font-medium text-navy">
              Change Password
            </span>
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-bg transition-colors text-left">
            <Download className="w-4 h-4 text-navy" />
            <span className="text-sm font-medium text-navy">
              Download My Data
            </span>
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-bg transition-colors text-left">
            <Trash2 className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-coral">
              Delete Account
            </span>
          </button>
        </div>
      </Card>
    </div>
  );
}
