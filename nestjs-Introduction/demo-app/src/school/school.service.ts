/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SchoolService {
     private studentData = [
          { id: 1, name: "rushikesh", age: 24 },
          { id: 2, name: "raj", age: 24 },
          { id: 3, name: "pratic", age: 25 },
     ];

     getAllStudentData() {
          return this.studentData
     }

     getStudentDataById(id: number) {
          const student = this.studentData.find((s) => s.id === id)
          if (!student) throw new NotFoundException("student not found")
          return student
     }

     createStudentData(data: { name: string, age: number }) {
          const newStudentData = {
               id: Date.now(),
               ...data
          }
          this.studentData.push(newStudentData)
          return this.studentData
     }

     updateStudentData(id: number, data: { name: string, age: number }) {
          const studentId = this.studentData.findIndex((s) => s.id === id)
          if (studentId === -1) throw new NotFoundException("student not found")
          this.studentData[studentId] = { id, ...data }
          return this.studentData[studentId]
     }


     patchStudentData(id: number, data: Partial<{ name: string, age: number }>) {
          const student = this.getStudentDataById(id)
          Object.assign(student, data)
          return student
     }

     deleteStudentData(id: number) {
          const studentIndex = this.studentData.findIndex((s) => s.id === id)
          if (studentIndex === -1) throw new NotFoundException("student not found")
          return this.studentData.splice(studentIndex, 1)[0];
     }
}
