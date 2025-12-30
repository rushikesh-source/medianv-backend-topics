/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirstAppService {
     private data=[
          {id:1,name:"rushikesh",age:23},
          {id:2,name:"alexa",age:24},
          {id:3,name:"mahesh",age:25},
          {id:4,name:"akash",age:29},
     ]

     getAllData(){
          return this.getAllData()
     }
}
