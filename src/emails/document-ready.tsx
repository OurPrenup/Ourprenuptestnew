import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Preview,
} from "@react-email/components";

interface DocumentReadyEmailProps {
  userName: string;
  documentUrl: string;
}

export default function DocumentReadyEmail({
  userName = "Customer",
  documentUrl = "https://ourprenup.com/documents",
}: DocumentReadyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your prenuptial agreement is ready to download</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Text style={logoStyle}>OurPrenup</Text>
          </Section>

          <Section style={contentStyle}>
            <Text style={headingStyle}>Your Prenup is Ready!</Text>

            <Text style={paragraphStyle}>Hi {userName},</Text>

            <Text style={paragraphStyle}>
              Great news — your prenuptial agreement has been generated and is
              ready for review. Log in to download your PDF and proceed with
              signing.
            </Text>

            <Section style={buttonContainerStyle}>
              <Button style={buttonStyle} href={documentUrl}>
                View Your Document
              </Button>
            </Section>

            <Text style={paragraphStyle}>
              Remember: both partners need to review and sign the agreement.
              Check your state&apos;s specific signing requirements in the app.
            </Text>
          </Section>

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              OurPrenup — Affordable prenuptial agreements for every couple.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#f8f9fa",
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
};

const containerStyle = { maxWidth: "560px", margin: "0 auto", padding: "20px 0" };
const headerStyle = { textAlign: "center" as const, padding: "24px 0" };
const logoStyle = { fontSize: "24px", fontWeight: "700", color: "#0F2162" };

const contentStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "40px 32px",
  border: "1px solid #e5e7eb",
};

const headingStyle = {
  fontSize: "22px",
  fontWeight: "600",
  color: "#0F2162",
  textAlign: "center" as const,
  marginBottom: "16px",
};

const paragraphStyle = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#374151",
  marginBottom: "16px",
};

const buttonContainerStyle = { textAlign: "center" as const, margin: "24px 0" };

const buttonStyle = {
  backgroundColor: "#0F2162",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 32px",
  borderRadius: "999px",
  textDecoration: "none",
};

const footerStyle = { textAlign: "center" as const, padding: "16px 0" };
const footerTextStyle = { fontSize: "12px", color: "#9ca3af", lineHeight: "1.5" };
