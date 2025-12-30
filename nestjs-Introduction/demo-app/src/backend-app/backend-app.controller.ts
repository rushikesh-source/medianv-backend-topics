/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { BackendAppService } from "./backend-app.service"

@Controller('backend-app')
export class BackendAppController {
     constructor(private readonly backendAppService: BackendAppService) { };

     @Get()
     userData() {
          return this.backendAppService.getAllUserData()
     }
     @Get(':id')
     userDataById(@Param('id') id: string) {
          return this.backendAppService.getUserDataById(Number(id))
     }

}
