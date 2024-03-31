import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { CreateSleepDTO } from './dto/create.sleep.dto';
import { UpdateSleepDTO } from './dto/update.sleep.dto';
import { QuerySleepDTO } from './dto/query.sleep.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SleepService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSleepDTO: CreateSleepDTO) {
    return this.databaseService.sleep.create({ data: createSleepDTO });
  }

  async findAll(querSleepDTO: QuerySleepDTO) {
    const { name, sleepDuration, gender } = querSleepDTO;
    console.log('============= findAll', name, sleepDuration, gender);

    const whereConditions = [];
    if (gender !== undefined) {
      whereConditions.push({ gender });
    }
    if (sleepDuration !== undefined) {
      whereConditions.push({ sleepDuration });
    }
    if (name !== undefined) {
      whereConditions.push({ name: { contains: name } });
    }

    if (whereConditions.length === 0) {
      return this.databaseService.sleep.findMany();
    } else {
      return this.databaseService.sleep.findMany({
        where: {
          OR: whereConditions,
        },
      });
    }
  }

  async findUsersAggravatedSleeps(name: string, days: number) {
    console.log('========== findUsersAggravatedSleeps', name, days);

    const whereConditions = [];

    // Filter by name if provided
    if (name !== undefined) {
      whereConditions.push({ name });
    }

    // Calculate the start date based on the current date and the provided number of days
    const startDate = dayjs().subtract(days, 'day').toDate();
    const endDate = new Date();

    // Filter by createdAt within the last `days`
    whereConditions.push({
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    });

    return this.databaseService.sleep.findMany({
      where: {
        AND: whereConditions, // Use AND to combine the filters
      },
      orderBy: {
        name: 'asc', // Sort by name in ascending order
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.sleep.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateSleepDTO: UpdateSleepDTO) {
    return this.databaseService.sleep.update({
      where: {
        id,
      },
      data: updateSleepDTO,
    });
  }

  async delete(id: number) {
    return this.databaseService.sleep.delete({ where: { id } });
  }
}
