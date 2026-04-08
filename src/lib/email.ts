import { Resend } from "resend";

let _resend: Resend | null = null;

/**
 * Lazily initialized Resend client.
 */
export function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

/** The "from" address for all emails. Update when you have a custom domain. */
export const FROM_EMAIL = process.env.EMAIL_FROM || "OurPrenup <onboarding@resend.dev>";
