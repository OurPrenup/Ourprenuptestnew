import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
} from "@react-email/components";

interface PaymentReceiptEmailProps {
  userName: string;
  productName: string;
  amountFormatted: string;
  date: string;
}

export default function PaymentReceiptEmail({
  userName = "Customer",
  productName = "Prenup Agreement",
  amountFormatted = "$599.00",
  date = "March 20, 2026",
}: PaymentReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your OurPrenup receipt — {amountFormatted}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Text style={logoStyle}>OurPrenup</Text>
          </Section>

          <Section style={contentStyle}>
            <Text style={headingStyle}>Payment Confirmed</Text>

            <Text style={paragraphStyle}>Hi {userName},</Text>

            <Text style={paragraphStyle}>
              Thank you for your purchase! Here are your receipt details:
            </Text>

            <Section style={receiptBoxStyle}>
              <Text style={receiptLabelStyle}>Product</Text>
              <Text style={receiptValueStyle}>{productName}</Text>

              <Text style={receiptLabelStyle}>Amount</Text>
              <Text style={receiptValueStyle}>{amountFormatted}</Text>

              <Text style={receiptLabelStyle}>Date</Text>
              <Text style={receiptValueStyle}>{date}</Text>
            </Section>

            <Hr style={hrStyle} />

            <Text style={footerTextStyle}>
              If you have any questions about your purchase, reply to this email
              or contact us at support@ourprenup.com.
            </Text>
          </Section>

          <Section style={footerSectionStyle}>
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

const receiptBoxStyle = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  margin: "16px 0",
};

const receiptLabelStyle = {
  fontSize: "11px",
  color: "#9ca3af",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: "2px",
};

const receiptValueStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#0F2162",
  marginBottom: "12px",
};

const hrStyle = { borderColor: "#e5e7eb", margin: "24px 0" };
const footerSectionStyle = { textAlign: "center" as const, padding: "16px 0" };
const footerTextStyle = { fontSize: "12px", color: "#9ca3af", lineHeight: "1.5" };
