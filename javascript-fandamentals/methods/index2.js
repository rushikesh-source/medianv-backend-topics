// filters
let bag = ["apple", "banana", "mango"]
let filterdFruits = bag.filter((elm) => elm.length >= 6)
console.log(filterdFruits);

let products = [
     { id: 1, title: "tshirt", price: 500 },
     { id: 2, title: "shirt", price: 200 },
     { id: 3, title: "jeans", price: 349 },
     { id: 4, title: "tshirt", price: 199 },
]

let filterdProductsByPrice = products.filter((item) => item.price <= 400)
console.log("Products filtered By Price :", filterdProductsByPrice);

let filterdProductsByCat = products.filter((item) => item.title === "tshirt")
console.log("Products filtered By catogery :", filterdProductsByCat);
