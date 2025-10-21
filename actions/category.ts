'use server'

import { prisma } from "@/lib/prisma";

export async function getAllCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}