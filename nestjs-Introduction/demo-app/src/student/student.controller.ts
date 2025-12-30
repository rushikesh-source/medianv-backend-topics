import { StudentService } from './student.service';
import { Controller, Get } from '@nestjs/common';

@Controller('student')
export class StudentController {
     constructor(private readonly studentService:StudentService){}
     
     @Get()
   getStudentMarks(){
    return this.studentService.getAllStudentData();
     }
}
