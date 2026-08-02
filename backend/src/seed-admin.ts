/**
 * seed-admin.ts
 * Run once to create the initial ADMIN account in the database.
 * Usage: npx ts-node src/seed-admin.ts
 */

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@hospital.local";
  const password = "Admin1234";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`✅ Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      accessRole: "ADMIN",
    },
  });

  console.log("✅ Admin user created successfully!");
  console.log(`   Email    : ${user.email}`);
  console.log(`   Role     : ${user.accessRole}`);
  console.log(`   Password : ${password}`);
  console.log(`   ID       : ${user.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
