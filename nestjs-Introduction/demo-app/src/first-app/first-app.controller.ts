import { Controller, Get } from '@nestjs/common';
import { FirstAppService } from './first-app.service';

@Controller('first-app')
export class FirstAppController {
     constructor(private readonly firstAppService:FirstAppService){}
     
     @Get('app')
     getData(){
          return this.firstAppService.getAllData()
     }
}
