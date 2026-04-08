import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function createDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const client = postgres(connectionString, {
    prepare: false, // required for Supabase transaction pooler
  });

  return drizzle(client, { schema });
}

/**
 * Lazily initialized database connection.
 * Only connects when first accessed (avoids build-time errors with placeholder env vars).
 */
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop, receiver) {
    if (!_db) {
      _db = createDb();
    }
    return Reflect.get(_db, prop, receiver);
  },
});
