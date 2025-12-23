// javascript variable declarations.

// var
var a = "rushikesh"
console.log(a);
a = "harsh"
console.log(a);

// let
let name = "alex"
console.log(name);
name = "elon"
console.log(name);

//const
const city = "pune"
// city="nagpur"              cannot directly update value
console.log(city);


//Data types

let age = "23"
console.log(typeof (age));

let num = +age     //convert string into number data type with (+)
let new_age = Number(age)
console.log(typeof (num));
console.log(typeof (new_age));

let convert_num = 1000
let str_num = String(convert_num)
console.log(typeof (str_num));


//  Operators

const num1 = 10
const num2 = 20
console.log(num1 + num2)
console.log(num1 - num2);
console.log(num1 * num2)
console.log(num1 % num2);
