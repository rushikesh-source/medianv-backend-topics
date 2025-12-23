// Array methods
let array = [10, 20, 30, 40]

//map
let mapped = array.map((nums) => nums * 2)
console.log(mapped)

let obj = [
     { key: 1, value: 10 },
     { key: 2, value: 20 },
     { key: 3, value: 30 },
]
let info = obj.map((objs) => objs.value)
console.log(info);
