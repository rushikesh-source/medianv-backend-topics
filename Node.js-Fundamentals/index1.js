//create a server with 
const PORT=3000
const http=require("http")
const app=http.createServer((req,res)=>{
     res.write("server is created")
     res.end()
})
app.listen(PORT,()=>{
     console.log(`server is create on port 3000`);
     
})