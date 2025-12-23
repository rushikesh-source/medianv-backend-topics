//spread 
let array = [25, 4, 9, 6, 5, 3, 2]
console.log(...array)

const new_array = [1, 2, 3]
const obj = { ...new_array }
console.log(obj);

// Spread in array literals
let numbers = [4, 5]
let nums = [1, 2, 3, ...numbers, 6, 7]
console.log(nums);

