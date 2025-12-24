//Event Loop mechanism in JavaScript

console.log("Hello From console.log 1");

setTimeout(() => {
     console.log("Hello From SetTimeOut !");

}, 1000)

const myPromise = new Promise((resolve, reject) => {
     let conditional = true
     if (conditional) {
          resolve("Promise Resolve")
     }
     else {
          reject("Promise Reject")
     }
}).then((result) => console.log(result))
     .catch((error) => console.log(error))

console.log("Hello From console.log 2");
