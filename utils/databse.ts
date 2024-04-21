import prisma from "@/prisma";

export async function connectDB() {
  try {
    await prisma.$connect();
  } catch (err) {
    throw new Error("Error connecting to database");
  }
}

export async function disconnectDB() {
  await prisma.$disconnect();
}
