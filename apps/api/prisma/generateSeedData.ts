import { Gender, Prisma } from '@prisma/client';

type SeedUser = { name: string; gender: Gender };

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

export function generateRandomSleepData(
  users: SeedUser[] = [
    { name: 'Mat', gender: 'Male' },
    { name: 'Jo', gender: 'Male' },
    { name: 'Natali', gender: 'Female' },
    { name: 'Sam', gender: 'Male' },
  ],
  duration: number = 10,
  records: number = 50,
  monthsAgo: number = 1,
): Prisma.SleepCreateInput[] {
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - monthsAgo); // Set date to last month

  const data: Prisma.SleepCreateInput[] = [];

  for (let i = 0; i < records; i++) {
    const userIndex = Math.floor(Math.random() * users.length);
    const user = users[userIndex];
    const sleepDuration = Math.floor(Math.random() * duration) + 1;
    const createdAt = generateRandomDate(lastMonthDate, currentDate);
    const updatedAt = createdAt;

    data.push({
      name: user.name,
      gender: user.gender,
      sleepDuration,
      createdAt,
      updatedAt,
    });
  }

  return data;
}

// Example usage:
const users: SeedUser[] = [
  { name: 'Mat', gender: 'Male' },
  { name: 'Jo', gender: 'Male' },
  { name: 'Natali', gender: 'Female' },
  { name: 'Sam', gender: 'Male' },
];
const duration = 10;
const records = 50;
const monthsAgo = 1;

const data = generateRandomSleepData(users, duration, records, monthsAgo);
console.log(data);
