import { Module } from '@nestjs/common';
import { SleepController } from './sleep.controller';
import { SleepService } from './sleep.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [SleepController],
  providers: [SleepService, DatabaseService],
})
export class SleepModule {}
