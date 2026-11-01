import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

const globalForDb = globalThis as typeof globalThis & {
  asohubDb?: PrismaClient;
};

export function getDb() {
  if (!globalForDb.asohubDb) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is not set.');
    }

    const adapter = new PrismaPg({
      connectionString,
      connectionTimeoutMillis: 5_000,
    });

    globalForDb.asohubDb = new PrismaClient({ adapter });
  }

  return globalForDb.asohubDb;
}
