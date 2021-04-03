var http = require('http')
http.createServer(function(req,res){
    console.log("Server Started on port 8080.")
    res.writeHead(200,{'content-type':'text/html'})
    res.end("Welcome")
}).listen(8080)