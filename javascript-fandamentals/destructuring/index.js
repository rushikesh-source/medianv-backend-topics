//Destructuring with array

let a, b
[a, b] = [10, 20]
console.log(a)
console.log(b);
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest);

//Destructuring with objs

let obj = {
     name: "Rushikesh",
     email: "rushi@gmail.com"
}

const { name, email } = obj
console.log(name);
console.log(email);
