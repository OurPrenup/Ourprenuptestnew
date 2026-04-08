// =============================================================================
// GET /api/documents/[documentId]/pdf
// Streams a generated PDF document for download.
// =============================================================================

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, documents } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ documentId: string }> }
) {
  // 1. Auth
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(clerkId);
  if (!user || !user.coupleId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Load document record
  const { documentId } = await params;

  // Validate UUID format to prevent DB errors on malformed IDs
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(documentId)) {
    return NextResponse.json({ error: "Invalid document ID" }, { status: 400 });
  }

  const [doc] = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
    .limit(1);

  if (!doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  // 3. Verify the document belongs to the user's couple
  if (doc.coupleId !== user.coupleId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 4. Return the PDF
  if (!doc.pdfStoragePath) {
    return NextResponse.json({ error: "PDF not generated" }, { status: 404 });
  }

  // Currently stored as base64 data URI.
  // When Supabase Storage is wired up, this will fetch from object storage instead.
  if (doc.pdfStoragePath.startsWith("data:application/pdf;base64,")) {
    const base64 = doc.pdfStoragePath.replace("data:application/pdf;base64,", "");
    const buffer = Buffer.from(base64, "base64");

    const filename = `ourprenup-${doc.type}-v${doc.version}.pdf`;

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  }

  // Future: fetch from Supabase Storage using doc.pdfStoragePath
  return NextResponse.json(
    { error: "Storage backend not configured" },
    { status: 500 }
  );
}
