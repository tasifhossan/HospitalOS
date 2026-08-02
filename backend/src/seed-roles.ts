/**
 * seed-roles.ts
 * Seeding script for Doctor, Nurse, Receptionist, and Patient users.
 * Usage: npx ts-node src/seed-roles.ts
 */

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const usersToSeed = [
    {
      email: "doctor@hospital.local",
      password: "Doctor1234",
      role: "DOCTOR" as const,
      name: "Elizabeth Blackwell",
      staffRole: "DOCTOR",
    },
    {
      email: "nurse@hospital.local",
      password: "Nurse1234",
      role: "NURSE" as const,
      name: "Florence Nightingale",
      staffRole: "NURSE",
    },
    {
      email: "receptionist@hospital.local",
      password: "Receptionist1234",
      role: "RECEPTIONIST" as const,
      name: "Alice Smith",
      staffRole: null,
    },
    {
      email: "patient@hospital.local",
      password: "Patient1234",
      role: "PATIENT" as const,
      name: "John Doe",
      staffRole: null,
    },
  ];

  console.log("🌱 Starting roles seeding...");

  for (const item of usersToSeed) {
    const existing = await prisma.user.findUnique({ where: { email: item.email } });
    if (existing) {
      console.log(`ℹ️ User already exists: ${item.email}`);
      continue;
    }

    const passwordHash = await bcrypt.hash(item.password, 12);

    let staffMemberId: string | undefined = undefined;

    if (item.staffRole) {
      // Create StaffMember record
      const staff = await prisma.staffMember.create({
        data: {
          name: item.name,
          role: item.staffRole,
          status: "ACTIVE",
        },
      });
      staffMemberId = staff.id;
      console.log(`Created Staff Member [${item.name}] for ${item.email}`);
    }

    const user = await prisma.user.create({
      data: {
        email: item.email,
        passwordHash,
        accessRole: item.role,
        staffMemberId,
      },
    });

    console.log(`✅ Created User: ${user.email} (Role: ${user.accessRole})`);
  }

  console.log("🌱 Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding roles failed:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
