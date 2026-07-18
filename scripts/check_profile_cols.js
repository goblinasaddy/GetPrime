const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const cols = await p.$queryRawUnsafe(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'Profile'
  `);
  console.log('Columns in Profile:', JSON.stringify(cols, null, 2));
}

main().catch(console.error).finally(() => p.$disconnect());
