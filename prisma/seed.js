// scripts/seedCategories.ts
import {PrismaClient} from '@prisma/client'

const prisma=new PrismaClient()

async function main() {
  const categories = [
    { name: "Conference" },
    { name: "Workshop" },
    { name: "Seminar" },
    { name: "Networking" },
    { name: "Webinar" },
    { name: "Meetup" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  console.log("✅ Categories seeded");
}

main().finally(() => prisma.$disconnect());
