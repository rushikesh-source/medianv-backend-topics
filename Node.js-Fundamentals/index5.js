// http module 

const http = require("http")
const PORT = 3000
const server = http.createServer((req, res) => {
     res.write("server is created with http module")
     res.end()
})
server.listen(PORT, () => {
     console.log(`server is running on ${PORT}`);

})