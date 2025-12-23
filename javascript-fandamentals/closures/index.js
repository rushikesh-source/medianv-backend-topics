//closure

function outer() {
     let count = 0
     return function inner() {
          count++
          return count
     }
}
let result = outer()
console.log(result());  //1
console.log(result());  //2
console.log(result());  //3
console.log(result());  //4
