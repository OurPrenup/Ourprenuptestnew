import {
  pgTable,
  uuid,
  text,
  date,
  timestamp,
  jsonb,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ──────────────────────────────────────────────
// users (defined first to avoid circular ref)
// ──────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").unique().notNull(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: text("role").notNull().default("primary"),
  coupleId: uuid("couple_id"), // FK to couples added at DB level, not here (avoids circular ref)
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ──────────────────────────────────────────────
// couples
// ──────────────────────────────────────────────
export const couples = pgTable("couples", {
  id: uuid("id").defaultRandom().primaryKey(),
  primaryUserId: uuid("primary_user_id").references(() => users.id),
  partnerUserId: uuid("partner_user_id").references(() => users.id),
  stateCode: text("state_code"),
  weddingDate: date("wedding_date"),
  inviteToken: text("invite_token").unique(),
  inviteEmail: text("invite_email"),
  inviteExpiresAt: timestamp("invite_expires_at", { withTimezone: true }),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ──────────────────────────────────────────────
// questionnaire_answers
// ──────────────────────────────────────────────
export const questionnaireAnswers = pgTable(
  "questionnaire_answers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    coupleId: uuid("couple_id").references(() => couples.id, { onDelete: "cascade" }).notNull(),
    stepId: text("step_id").notNull(),
    answers: jsonb("answers").notNull().default({}),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("questionnaire_answers_user_step_idx").on(table.userId, table.stepId),
  ]
);

// ──────────────────────────────────────────────
// financial_disclosures
// ──────────────────────────────────────────────
export const financialDisclosures = pgTable(
  "financial_disclosures",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    coupleId: uuid("couple_id").references(() => couples.id, { onDelete: "cascade" }).notNull(),
    data: jsonb("data").notNull().default({}),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("financial_disclosures_user_couple_idx").on(table.userId, table.coupleId),
  ]
);

// ──────────────────────────────────────────────
// collaboration_conflicts
// ──────────────────────────────────────────────
export const collaborationConflicts = pgTable(
  "collaboration_conflicts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    coupleId: uuid("couple_id").references(() => couples.id, { onDelete: "cascade" }).notNull(),
    stepId: text("step_id").notNull(),
    questionId: text("question_id").notNull(),
    primaryAnswer: jsonb("primary_answer"),
    partnerAnswer: jsonb("partner_answer"),
    resolvedAnswer: jsonb("resolved_answer"),
    resolvedBy: uuid("resolved_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("collaboration_conflicts_couple_step_question_idx").on(
      table.coupleId,
      table.stepId,
      table.questionId
    ),
  ]
);

// ──────────────────────────────────────────────
// documents
// ──────────────────────────────────────────────
export const documents = pgTable(
  "documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    coupleId: uuid("couple_id").references(() => couples.id, { onDelete: "cascade" }).notNull(),
    type: text("type").notNull(),
    version: integer("version").notNull().default(1),
    pdfStoragePath: text("pdf_storage_path"),
    generatedAt: timestamp("generated_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("documents_couple_type_version_idx").on(table.coupleId, table.type, table.version),
  ]
);

// ──────────────────────────────────────────────
// payments
// ──────────────────────────────────────────────
export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  coupleId: uuid("couple_id").references(() => couples.id, { onDelete: "cascade" }).notNull(),
  stripeSessionId: text("stripe_session_id").unique(),
  productType: text("product_type").notNull(),
  amountCents: integer("amount_cents").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ──────────────────────────────────────────────
// progress
// ──────────────────────────────────────────────
export const progress = pgTable(
  "progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    coupleId: uuid("couple_id").references(() => couples.id, { onDelete: "cascade" }).notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    completedSteps: text("completed_steps").array().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("progress_couple_user_idx").on(table.coupleId, table.userId),
  ]
);
