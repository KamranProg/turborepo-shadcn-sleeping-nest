import { PartialType } from '@nestjs/mapped-types';
import { QuerySleepDTO } from './query.sleep.dto';

export class UpdateSleepDTO extends PartialType(QuerySleepDTO) {}
