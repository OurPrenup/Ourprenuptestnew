import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — OurPrenup",
  description:
    "Terms of Service for OurPrenup, the online prenuptial agreement platform.",
};

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        <p className="text-text-secondary text-sm mb-12">
          Effective Date: March 26, 2026
        </p>

        <div className="space-y-10 text-text-secondary leading-relaxed">
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the OurPrenup website, mobile application, or
              any related services (collectively, the &ldquo;Service&rdquo;),
              you agree to be bound by these Terms of Service
              (&ldquo;Terms&rdquo;). If you do not agree to all of these Terms,
              you may not access or use the Service. These Terms constitute a
              legally binding agreement between you and OurPrenup Inc.
              (&ldquo;OurPrenup,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;).
            </p>
            <p className="mt-3">
              We may update these Terms from time to time. Your continued use of
              the Service after any changes constitutes acceptance of the updated
              Terms. We encourage you to review these Terms periodically.
            </p>
          </section>

          {/* 2. Description of Service */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              2. Description of Service
            </h2>
            <p>
              OurPrenup provides self-help tools for creating prenuptial
              agreements. We are not a law firm, we do not provide legal advice,
              and no attorney-client relationship is formed through your use of
              the Service. Our platform guides you through a questionnaire-based
              process to generate prenuptial agreement documents tailored to your
              state&apos;s legal requirements.
            </p>
            <p className="mt-3">
              The Service includes, but is not limited to: guided questionnaires,
              a 50-state legal rules engine, document generation, partner
              collaboration tools, financial disclosure worksheets, and optional
              attorney review referrals.
            </p>
          </section>

          {/* 3. User Accounts */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              3. User Accounts
            </h2>
            <p>
              To use certain features of the Service, you must create an account.
              You agree to provide accurate, current, and complete information
              during registration and to update such information to keep it
              accurate, current, and complete. You are responsible for
              safeguarding the password associated with your account and for all
              activities that occur under your account.
            </p>
            <p className="mt-3">
              You must be at least 18 years of age to create an account and use
              the Service. By creating an account, you represent and warrant that
              you are 18 years of age or older.
            </p>
            <p className="mt-3">
              You agree to notify us immediately of any unauthorized use of your
              account. OurPrenup will not be liable for any loss arising from
              unauthorized use of your account.
            </p>
          </section>

          {/* 4. Payment Terms */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              4. Payment Terms
            </h2>
            <p>
              Certain features of the Service require payment. All fees are
              quoted in U.S. dollars and are non-inclusive of applicable taxes
              unless otherwise stated. Payment is processed securely through our
              third-party payment processor, Stripe.
            </p>
            <p className="mt-3">
              <strong className="text-navy-dark">Refund Policy:</strong> Once
              your prenuptial agreement document has been generated, your payment
              is non-refundable. If you have not yet generated a document, you
              may request a full refund within 30 days of purchase. To request a
              refund, contact us at{" "}
              <a
                href="mailto:support@ourprenup.com"
                className="text-navy underline hover:text-navy-light"
              >
                support@ourprenup.com
              </a>
              .
            </p>
            <p className="mt-3">
              We reserve the right to change our pricing at any time. Any price
              changes will not affect orders already placed or services already
              purchased.
            </p>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              5. Intellectual Property
            </h2>
            <p>
              The Service, including its original content, features, and
              functionality, is owned by OurPrenup Inc. and is protected by
              United States and international copyright, trademark, patent, trade
              secret, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You retain ownership of the personal information and content you
              provide through the Service. By using the Service, you grant
              OurPrenup a limited, non-exclusive license to use your content
              solely for the purpose of providing the Service to you.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, or otherwise exploit the Service or any
              portion thereof without our express written permission.
            </p>
          </section>

          {/* 6. No Legal Advice Disclaimer */}
          <section className="bg-pink/10 border border-pink/30 rounded-[16px] p-6">
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              6. No Legal Advice Disclaimer
            </h2>
            <p className="font-medium text-navy-dark">
              IMPORTANT: OurPrenup is not a law firm and does not provide legal
              advice. The Service is a self-help technology platform that
              provides tools and information to assist you in preparing your own
              prenuptial agreement documents.
            </p>
            <p className="mt-3">
              No attorney-client relationship is created between you and
              OurPrenup by your use of the Service. The information provided by
              the Service is general in nature and may not apply to your specific
              legal situation.
            </p>
            <p className="mt-3">
              We strongly recommend that each party to a prenuptial agreement
              retain independent legal counsel to review the agreement before
              signing. The use of the Service is not a substitute for the advice
              of an attorney licensed in your jurisdiction.
            </p>
            <p className="mt-3">
              OurPrenup makes no representations or warranties regarding the
              enforceability of any document generated through the Service. Laws
              governing prenuptial agreements vary by state and are subject to
              change. Courts retain the discretion to modify, limit, or
              invalidate prenuptial agreements.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              SHALL OURPRENUP INC., ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS,
              OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
              LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
              ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
            </p>
            <p className="mt-3">
              IN NO EVENT SHALL OURPRENUP&apos;S TOTAL LIABILITY TO YOU FOR ALL
              CLAIMS ARISING OUT OF OR RELATING TO THE SERVICE EXCEED THE AMOUNT
              YOU PAID TO OURPRENUP FOR THE SERVICE DURING THE TWELVE (12)
              MONTHS PRECEDING THE CLAIM.
            </p>
            <p className="mt-3">
              OURPRENUP SPECIFICALLY DISCLAIMS ALL LIABILITY FOR ANY ACTIONS
              RESULTING FROM YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED
              TO THE ENFORCEABILITY, VALIDITY, OR LEGAL EFFECT OF ANY DOCUMENTS
              GENERATED THROUGH THE SERVICE.
            </p>
          </section>

          {/* 8. Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              8. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of Delaware, without regard to its conflict
              of law provisions. Any legal action or proceeding arising out of or
              relating to these Terms shall be brought exclusively in the state
              or federal courts located in Wilmington, Delaware, and you consent
              to the personal jurisdiction and venue of such courts.
            </p>
          </section>

          {/* 9. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              9. Termination
            </h2>
            <p>
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice or liability, for any reason,
              including but not limited to a breach of these Terms.
            </p>
            <p className="mt-3">
              Upon termination, your right to use the Service will cease
              immediately. If you wish to terminate your account, you may do so
              by contacting us at{" "}
              <a
                href="mailto:support@ourprenup.com"
                className="text-navy underline hover:text-navy-light"
              >
                support@ourprenup.com
              </a>
              . Termination of your account does not relieve you of any
              obligation to pay fees incurred prior to termination.
            </p>
            <p className="mt-3">
              All provisions of these Terms that by their nature should survive
              termination shall survive, including but not limited to ownership
              provisions, warranty disclaimers, indemnity, and limitations of
              liability.
            </p>
          </section>

          {/* 10. Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. If a revision is material, we will provide
              at least 30 days&apos; notice prior to the new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
            <p className="mt-3">
              By continuing to access or use the Service after any revisions
              become effective, you agree to be bound by the revised Terms. If
              you do not agree to the new Terms, you must stop using the Service.
            </p>
          </section>

          {/* 11. Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-navy-dark font-[family-name:var(--font-heading)] mb-3">
              11. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-3 space-y-1">
              <p className="font-medium text-navy-dark">OurPrenup Inc.</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@ourprenup.com"
                  className="text-navy underline hover:text-navy-light"
                >
                  support@ourprenup.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
