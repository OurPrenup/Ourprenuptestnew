import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer — OurPrenup",
  description:
    "Legal disclaimer for OurPrenup, the online prenuptial agreement platform.",
};

export default function Disclaimer() {
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
          Legal Disclaimer
        </h1>
        <p className="text-text-secondary text-sm mb-12">
          Effective Date: March 2026
        </p>

        <div className="space-y-10 text-text-secondary leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              1. OurPrenup Is Not a Law Firm
            </h2>
            <p>
              OurPrenup is an online document preparation service. We are not a
              law firm, and we do not employ or retain attorneys to represent
              users. No attorney-client relationship is formed between you and
              OurPrenup by using this platform. Our team members, employees, and
              contractors are not acting as your attorney.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              2. No Attorney-Client Relationship
            </h2>
            <p>
              Your use of OurPrenup, including any communication with us via
              email, chat, or other channels, does not create an
              attorney-client relationship. Any information you share with us is
              not protected by attorney-client privilege.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              3. Not Legal Advice
            </h2>
            <p>
              The information, tools, questionnaires, and documents provided by
              OurPrenup are for general informational and document preparation
              purposes only. Nothing on this platform constitutes legal advice,
              and no information provided should be construed as such. The
              content is not a substitute for professional legal counsel tailored
              to your specific circumstances.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              4. No Guarantee of Enforceability
            </h2>
            <p>
              While our legal engine generates state-specific language and
              accounts for jurisdiction-specific requirements, we cannot and do
              not guarantee that any prenuptial agreement generated through
              OurPrenup will be enforceable in a court of law. Enforceability
              depends on many factors, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm mt-3">
              <li>Applicable state law at the time of execution and at the time of enforcement.</li>
              <li>Whether both parties provided full and fair financial disclosure.</li>
              <li>Whether both parties entered the agreement voluntarily and without duress or coercion.</li>
              <li>Whether the terms are unconscionable at the time of enforcement.</li>
              <li>Whether the agreement was properly executed with required witnesses and/or notarization.</li>
              <li>Whether both parties had adequate time to review the agreement before signing.</li>
              <li>Whether both parties had the opportunity to consult independent legal counsel.</li>
              <li>Changes in law between the date of signing and the date of enforcement.</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              5. Recommendation to Seek Independent Legal Counsel
            </h2>
            <p>
              We strongly recommend that each party to a prenuptial agreement
              consult with their own independent, licensed attorney before
              signing. Independent legal counsel can evaluate whether the
              agreement is fair, explain the legal implications of specific
              provisions, and ensure that your rights are adequately protected.
              Some states give greater weight to prenuptial agreements when both
              parties have been represented by independent counsel.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              6. State-Specific Variations
            </h2>
            <p>
              Prenuptial agreement law varies significantly from state to state.
              Our legal engine generates documents based on publicly available
              statutes, case law, and legal standards for each jurisdiction.
              However, laws change, courts interpret statutes differently, and
              individual circumstances may affect how the law applies to your
              situation. OurPrenup cannot account for every possible variation,
              recent legal developments, or individual factual circumstance.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, OurPrenup, its
              owners, officers, employees, agents, and affiliates shall not be
              liable for any direct, indirect, incidental, special,
              consequential, or punitive damages arising out of or related to
              your use of the platform, including but not limited to damages
              resulting from: a prenuptial agreement being deemed unenforceable;
              errors or omissions in generated documents; reliance on information
              provided by the platform; or any action taken or not taken based on
              content provided through OurPrenup.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              8. User Responsibility
            </h2>
            <p>
              You are solely responsible for the accuracy and completeness of all
              information you provide through OurPrenup. The quality and
              enforceability of your prenuptial agreement depends on the accuracy
              of the information you submit. You are responsible for reviewing
              the generated agreement carefully before signing and for ensuring
              that the agreement is executed in compliance with your state's
              requirements.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-semibold text-navy-dark mb-3">
              9. Contact Us
            </h2>
            <p>
              If you have questions about this disclaimer, please contact us at:
            </p>
            <p className="mt-2 text-sm font-medium text-navy-dark">
              legal@ourprenup.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
