//Objects

let student={
     name:"Rushikesh",
     email:"rushi@gmail.com",
     age:23,
}
// console.log(student);

//update
student.name="alex"
console.log(student.name);

//delete
delete student.name
console.log(student);

//multiple obj create 
class Students{
     constructor(name,email,age) {
          this.name=name,
          this.email=email,
          this.age=age
     }
}
let student1=new Students("virat","virat@gmail.com",40)
let student2=new Students("rohit","rohit@gmail.com",42)
let student3=new Students("hardik","hardik@gmail.com",35)
console.log(student1);
console.log(student2)
console.log(student3)
