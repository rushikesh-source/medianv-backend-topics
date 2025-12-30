/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
     private  studentsMarks = [
          { id: 1, sub: "math", "role": 21, marks: 90},
          { id: 2, sub: "science", "role": 22, marks: 95 },
          { id: 3, sub: "hindi", "role": 23, marks: 80 },
          { id: 4, sub: "politic", "role": 24, marks: 88 }
     ]
     getAllStudentData() {
          return this.studentsMarks.map((items)=>items)
     }
}
