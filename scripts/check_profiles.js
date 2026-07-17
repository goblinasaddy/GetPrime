const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.profile.findMany().then(r => {
  console.log('Profiles in DB:', JSON.stringify(r, null, 2));
  return p.$disconnect();
}).catch(e => { console.error(e); p.$disconnect(); });
