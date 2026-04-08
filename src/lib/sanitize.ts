import type { InferSelectModel } from "drizzle-orm";
import type { couples } from "./db/schema";

type CoupleRecord = InferSelectModel<typeof couples>;

/**
 * Strip sensitive fields (inviteToken, inviteExpiresAt) from a couple record
 * before returning it in an API response. Returns only the fields the client needs.
 */
export function sanitizeCoupleRecord(couple: CoupleRecord) {
  return {
    id: couple.id,
    primaryUserId: couple.primaryUserId,
    partnerUserId: couple.partnerUserId,
    stateCode: couple.stateCode,
    weddingDate: couple.weddingDate,
    status: couple.status,
    inviteEmail: couple.inviteEmail,
    createdAt: couple.createdAt,
    updatedAt: couple.updatedAt,
  };
}
