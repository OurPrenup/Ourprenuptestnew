import { NextResponse } from "next/server";

export async function GET() {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "No CLERK_SECRET_KEY" }, { status: 500 });
  }

  try {
    // List webhook endpoints via Clerk Backend API
    const res = await fetch("https://api.clerk.com/v1/webhooks", {
      headers: { Authorization: `Bearer ${secretKey}` },
    });

    if (!res.ok) {
      // Try the Svix token endpoint instead
      const svixRes = await fetch("https://api.clerk.com/v1/webhooks/svix_url", {
        headers: { Authorization: `Bearer ${secretKey}` },
      });
      const svixData = await svixRes.json();
      return NextResponse.json({ svix: svixData, status: svixRes.status });
    }

    const data = await res.json();
    return NextResponse.json({ webhooks: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
