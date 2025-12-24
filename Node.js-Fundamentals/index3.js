// CRUD Operation with fs module 

// create File
const fs = require('fs')
fs.writeFileSync('test.txt', 'Hello Node')


fs.writeFile("myData.txt", "hello From fs module", (err) => {
     if (err) {
          console.log(err);
          return
     }
     console.log("myData file is created Now !");

})

//read file 
let data = fs.readFileSync("./data.txt", "utf-8")
console.log(data);

fs.readFile("./data.txt", "utf8", (err, data) => {
     if (err) {
          console.log(err);
          return
     }
     console.log("file data is here -", data);

})

//update
fs.writeFileSync("./test.txt", "\n new line is added here file is updated")

fs.writeFile("./data.txt", "\n new line is added", (err) => {
     if (err) {
          console.log(err);
          return
     }
     console.log("file is updated");

})

//delete file 

fs.unlinkSync("./test.txt")

fs.unlink("./test.txt", (err) => {
     if (err) {
          console.log("file is not delete");
          return
     }
     console.log("file is deleted");
     
})