import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — OurPrenup",
  description:
    "Privacy Policy for OurPrenup, the online prenuptial agreement platform.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-navy hover:text-navy-light transition-colors text-sm font-medium mb-10"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-2">
          Privacy Policy
        </h1>
        <p className="text-text-secondary text-sm mb-12">
          Effective Date: March 2026
        </p>

        <div className="space-y-10 text-text-secondary leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information you provide directly when using OurPrenup:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Account Information:</strong> Name, email address, and
                authentication credentials managed through our identity provider
                (Clerk).
              </li>
              <li>
                <strong>Questionnaire Responses:</strong> Answers you provide
                about property, debts, income, spousal support preferences, and
                other details needed to generate your prenuptial agreement.
              </li>
              <li>
                <strong>Financial Disclosure Data:</strong> Assets, liabilities,
                income, and expense information you enter as part of the
                financial disclosure process.
              </li>
              <li>
                <strong>Payment Information:</strong> Payment details are
                collected and processed securely by Stripe. We do not store your
                credit card number on our servers.
              </li>
              <li>
                <strong>Usage Data:</strong> Browser type, IP address, pages
                visited, and interactions with the platform to improve our
                service.
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                To generate your state-specific prenuptial agreement and
                supporting documents.
              </li>
              <li>
                To facilitate collaboration between you and your partner,
                including conflict detection and resolution.
              </li>
              <li>To process payments and send transaction receipts.</li>
              <li>
                To send service-related communications such as partner
                invitations, document-ready notifications, and account updates.
              </li>
              <li>To improve, maintain, and protect the platform.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              3. Data Storage & Security
            </h2>
            <p>
              Your data is stored in a secure PostgreSQL database hosted by
              Supabase with encryption at rest and in transit. Generated
              documents are stored in Supabase Storage with access controls that
              ensure only authorized users can retrieve their files. We implement
              industry-standard security measures, including TLS encryption,
              secure authentication tokens, and row-level security policies.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              4. Third-Party Services
            </h2>
            <p className="mb-3">
              We use the following third-party services to operate OurPrenup.
              Each has its own privacy policy governing how they handle your
              data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Clerk</strong> — Authentication and user management.
              </li>
              <li>
                <strong>Stripe</strong> — Payment processing. Stripe is PCI DSS
                Level 1 compliant.
              </li>
              <li>
                <strong>Supabase</strong> — Database hosting and file storage.
              </li>
              <li>
                <strong>Resend</strong> — Transactional email delivery.
              </li>
              <li>
                <strong>Dropbox Sign</strong> — Electronic signature services
                for document execution.
              </li>
              <li>
                <strong>Notarize.com</strong> — Remote online notarization
                services.
              </li>
              <li>
                <strong>Vercel</strong> — Application hosting and deployment.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              5. Data Retention
            </h2>
            <p>
              We retain your account and agreement data for as long as your
              account is active or as needed to provide services to you. If you
              request account deletion, we will delete your personal data within
              30 days, except where retention is required by law (e.g., payment
              records for tax compliance). Generated documents may be retained
              for a reasonable period to allow you to re-download them.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              6. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have the following rights
              regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Access:</strong> Request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your account and
                associated data.
              </li>
              <li>
                <strong>Export:</strong> Request a machine-readable export of
                your data.
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from non-essential
                communications at any time.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at the email address
              listed below. We will respond within 30 days.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              7. Cookies
            </h2>
            <p>
              We use essential cookies required for authentication and session
              management. We may also use analytics cookies to understand how
              visitors interact with our platform. You can control cookie
              preferences through your browser settings.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              8. Children&apos;s Privacy
            </h2>
            <p>
              OurPrenup is not intended for use by individuals under the age of
              18. We do not knowingly collect personal information from children.
              If we learn that we have collected data from a person under 18, we
              will delete that information promptly.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. If we make
              material changes, we will notify you by email or by posting a
              notice on the platform. Your continued use of OurPrenup after
              changes are posted constitutes your acceptance of the updated
              policy.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise
              your data rights, please contact us at:
            </p>
            <p className="mt-2 text-sm font-medium text-navy-dark">
              privacy@ourprenup.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
