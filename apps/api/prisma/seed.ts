import { PrismaClient, Prisma } from '@prisma/client';
import { generateRandomSleepData } from './generateSeedData';

const prismaClient = new PrismaClient();

const data: Prisma.SleepCreateInput[] = generateRandomSleepData();

async function main() {
  for (const sleepData of data) {
    // Create a new record for each element in the data array
    await prismaClient.sleep.create({
      data: sleepData,
    });
  }
}

// Running async main
main()
  .catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
