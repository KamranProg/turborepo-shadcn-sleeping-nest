import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SleepModule } from './sleep/sleep.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [SleepModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
