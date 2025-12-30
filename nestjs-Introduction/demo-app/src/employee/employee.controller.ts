import { Controller, Get } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {

     @Get()
     getEmployeeData() {
          return "Hello From employee"
     }
}
