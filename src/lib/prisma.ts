import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Dynamically patch DATABASE_URL to include pgbouncer=true if it targets a Supabase transaction pooler
let databaseUrl = process.env.DATABASE_URL || "";
if (databaseUrl.includes("pooler.supabase.com") || databaseUrl.includes(":6543")) {
  if (!databaseUrl.includes("pgbouncer=true")) {
    const separator = databaseUrl.includes("?") ? "&" : "?";
    databaseUrl = `${databaseUrl}${separator}pgbouncer=true`;
  }
  // Ensure connection limit is optimized for serverless environments
  if (!databaseUrl.includes("connection_limit=")) {
    databaseUrl = `${databaseUrl}&connection_limit=3`;
  }
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

