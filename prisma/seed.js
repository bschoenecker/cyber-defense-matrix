const { PrismaClient } = require('../src/generated/prisma')
const bcrypt = require('bcryptjs')

const db = new PrismaClient()

async function main() {
  const existing = await db.user.findUnique({ where: { email: 'admin@cdm.local' } })
  if (existing) {
    console.log('Admin user already exists — skipping seed')
    return
  }
  const passwordHash = await bcrypt.hash('ChangeMe123!', 12)
  await db.user.create({
    data: {
      name: 'Administrator',
      email: 'admin@cdm.local',
      passwordHash,
      role: 'ADMIN',
      active: true,
    },
  })
  console.log('Created default admin: admin@cdm.local / ChangeMe123!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())
