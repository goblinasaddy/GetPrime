const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // Check actual table names in public schema
  const tables = await p.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`;
  console.log('Public tables:', JSON.stringify(tables, null, 2));

  // Check for triggers on auth.users
  const triggers = await p.$queryRaw`SELECT trigger_name, event_manipulation, action_statement FROM information_schema.triggers WHERE event_object_schema='auth' AND event_object_table='users'`;
  console.log('Triggers on auth.users:', JSON.stringify(triggers, null, 2));
}

main().catch(console.error).finally(() => p.$disconnect());
