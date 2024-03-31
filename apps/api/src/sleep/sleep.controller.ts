import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
// DTO's & Types
import { CreateSleepDTO } from './dto/create.sleep.dto';
import { UpdateSleepDTO } from './dto/update.sleep.dto';
import { SleepService } from './sleep.service';
import { QuerySleepDTO } from './dto/query.sleep.dto';
import { ResponseSleepEntity } from './entities/response.sleep.entity';

@ApiTags('Sleeps') // Tag for Swagger
@Controller('sleeps')
export class SleepController {
  constructor(private readonly sleepService: SleepService) {}

  /*********************** Create Sleep *****************************/
  @Post() // Post /sleeps
  /**** Swagger ****/
  @ApiOperation({ summary: 'Create a new sleep' })
  @ApiResponse({
    status: 201,
    description: 'The sleep has been successfully created',
    type: ResponseSleepEntity,
  })
  /**** End Swagger ****/
  create(@Body(ValidationPipe) createSleepDTO: CreateSleepDTO) {
    return this.sleepService.create(createSleepDTO);
  }

  /*********************** Read Sleep *****************************/
  @Get() // Get /sleeps || /sleeps?name="abc.."&duration="1"
  /**** Swagger ****/
  @ApiOperation({ summary: 'Retrieve sleeps' })
  @ApiResponse({
    status: 200,
    description: 'List of sleeps',
    type: ResponseSleepEntity,
    isArray: true,
  })
  @ApiQuery({ type: UpdateSleepDTO })
  /**** End Swagger ****/
  findAll(@Query() quertSleepDTO: QuerySleepDTO) {
    return this.sleepService.findAll(quertSleepDTO);
  }

  @Get('/bydays') // Get //aggrigated || /sleeps/bydays?name="abc.."&days="7"
  /**** Swagger ****/
  @ApiOperation({ summary: 'Retrieve sleeps' })
  @ApiResponse({
    status: 200,
    description: 'List of users aggrigated sleeps',
    type: ResponseSleepEntity,
    isArray: true,
  })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({
    name: 'days',
    required: false,
    schema: { default: 7 },
  }) /**** End Swagger ****/
  findUsersAggravatedSleeps(
    @Query('name') name: string = undefined,
    @Query('days', ParseIntPipe) days: number = 7,
  ) {
    return this.sleepService.findUsersAggravatedSleeps(name, days);
  }

  @Get(':id') // Get /sleeps:id
  /**** Swagger ****/
  @ApiOperation({ summary: 'Retrieve a sleep by ID' })
  @ApiResponse({
    status: 200,
    description: 'Sleep by id',
    type: ResponseSleepEntity,
  })
  @ApiParam({ name: 'id', type: 'number' })
  /**** End Swagger ****/
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sleepService.findOne(id);
  }

  /*********************** Update Sleep *****************************/
  @Patch(':id') // Patch /sleeps/:id
  /**** Swagger ****/
  @ApiOperation({ summary: 'Update a sleep by ID' })
  @ApiResponse({
    status: 201,
    description: 'Updated sleep by id',
    type: ResponseSleepEntity,
  })
  @ApiParam({ name: 'id', type: 'number' })
  /**** End Swagger ****/
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateSleepDTO: UpdateSleepDTO,
  ) {
    return this.sleepService.update(id, updateSleepDTO);
  }

  /*********************** Delete Sleep *****************************/
  @Delete(':id') // Delete /sleeps/:id
  /**** Swagger ****/
  @ApiOperation({ summary: 'Delete a sleep by ID' })
  @ApiResponse({
    status: 201,
    description: 'Deleted sleep by id',
    type: ResponseSleepEntity,
  })
  @ApiParam({ name: 'id', type: 'number' })
  /**** End Swagger ****/
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.sleepService.delete(id);
  }
}
