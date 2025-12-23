// promises

let delivaryPizza = true

let mypromise = new Promise((resolve, reject) => {
     if (delivaryPizza) {
          resolve("pizza delivered !")
     }
     else {
          reject("dilivery reject")
     }
})
     .then((result) => console.log(result))
     .catch((err) => console.log(err))

console.log(mypromise);
