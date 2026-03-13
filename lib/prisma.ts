import { PrismaClient } from "@prisma/client";

// Prevent runtime crashes when DATABASE_URL is missing.
// Next.js usually loads .env automatically, but this fallback keeps local/dev boot resilient.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
