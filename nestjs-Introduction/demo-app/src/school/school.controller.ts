import { SchoolService } from './school.service';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  getAllStudentData() {
    return this.schoolService.getAllStudentData();
  }

  @Get(':id')
  getDataById(@Param('id') id: string) {
    return this.schoolService.getStudentDataById(Number(id))
  }

  @Post()
  createStudentData(@Body() body: { name: string; age: number }) {
    return this.schoolService.createStudentData(body);
  }

  @Put(':id')
  updateStudentDataById(
    @Param('id') id: string,
    @Body() body: { name: string; age: number },
  ) {
    return this.schoolService.updateStudentData(Number(id), body);
  }

  @Patch(':id')
  patchStudentData(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; age: number }>,
  ) {
    return this.schoolService.patchStudentData(Number(id), body);
  }
}
