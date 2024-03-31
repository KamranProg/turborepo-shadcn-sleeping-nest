import { IsEnum, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { GenderType, genderTuple } from './create.sleep.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySleepDTO {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  name?: string;

  @IsEnum(genderTuple, { message: 'Valid gender required' })
  @ApiPropertyOptional({ enum: genderTuple })
  gender?: GenderType;

  @IsPositive()
  @ApiPropertyOptional()
  sleepDuration?: number;
}
