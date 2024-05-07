const express = require("express");
const {router} = require("./routes/tasks");
const server = express();

server.use(express.json());

const port = 5000;

server.listen(port,() =>{
    console.log("Server running in port: " + port);
})

server.get("/health",(req,res) =>{
    return res.json({"status" : "running"});
})

server.use(router);
