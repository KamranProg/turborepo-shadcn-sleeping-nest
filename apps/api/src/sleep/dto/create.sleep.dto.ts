import { IsEnum, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export const genderTuple = ['Male', 'Female'] as const;
export type GenderType = (typeof genderTuple)[number]; //  "Male" | "Female"

export class CreateSleepDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['Male', 'Female'], { message: 'Valid gender required' })
  gender: GenderType;

  @IsPositive()
  sleepDuration: number;
}
