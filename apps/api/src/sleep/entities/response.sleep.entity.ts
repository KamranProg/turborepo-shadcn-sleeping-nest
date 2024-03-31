import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Sleep } from '@prisma/client';

export class ResponseSleepEntity implements Sleep {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: $Enums.Gender;
  @ApiProperty()
  sleepDuration: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
