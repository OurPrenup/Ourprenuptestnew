import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Preview,
} from "@react-email/components";

interface PartnerInviteEmailProps {
  partnerName: string;
  senderName: string;
  inviteUrl: string;
}

export default function PartnerInviteEmail({
  partnerName = "Partner",
  senderName = "Your partner",
  inviteUrl = "https://ourprenup.com/invite/accept",
}: PartnerInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{senderName} invited you to create your prenup together</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Text style={logoStyle}>OurPrenup</Text>
          </Section>

          <Section style={contentStyle}>
            <Text style={headingStyle}>
              You&apos;ve been invited!
            </Text>

            <Text style={paragraphStyle}>
              Hi {partnerName},
            </Text>

            <Text style={paragraphStyle}>
              {senderName} has invited you to create your prenuptial agreement
              together on OurPrenup. Working through this together ensures both
              of your interests are protected.
            </Text>

            <Section style={buttonContainerStyle}>
              <Button style={buttonStyle} href={inviteUrl}>
                Accept Invitation
              </Button>
            </Section>

            <Text style={paragraphStyle}>
              After you accept, you&apos;ll create your own account and fill out
              the questionnaire independently. Any differences in your answers
              will be flagged so you can discuss and resolve them together.
            </Text>

            <Hr style={hrStyle} />

            <Text style={footerTextStyle}>
              If you weren&apos;t expecting this email, you can safely ignore it.
              This invitation was sent by {senderName} via OurPrenup.
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

const containerStyle = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "20px 0",
};

const headerStyle = {
  textAlign: "center" as const,
  padding: "24px 0",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#0F2162",
};

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

const buttonContainerStyle = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const buttonStyle = {
  backgroundColor: "#0F2162",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 32px",
  borderRadius: "999px",
  textDecoration: "none",
};

const hrStyle = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const footerStyle = {
  textAlign: "center" as const,
  padding: "16px 0",
};

const footerTextStyle = {
  fontSize: "12px",
  color: "#9ca3af",
  lineHeight: "1.5",
};
