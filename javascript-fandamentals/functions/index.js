// functions
function data(value) {
     return value
}
console.log(data("Hello World...! "))

console.log(square(10))  //here function is hoisted 

function square(number) {
     return number * number;
}

// Function expressions

let sumOfNumbers = function (number) {
     return number + 50
}
console.log(sumOfNumbers(10));

let sayHello = function (value) {
     return value
}
console.log(sayHello("welcome to media NV...!"));

// arrow functions 

let arr = [10, 20, 30, 40, 50]
let arrFun = () => {
     return "Hello From Arrow Function"
}
console.log(arrFun());

let sumofElement = (arr) => {
     return arr.map((elm) => elm * 2)
}
console.log(sumofElement(arr));
