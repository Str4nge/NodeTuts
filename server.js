const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('Request made',req.url);
    res.setHeader('Content-Type','text/html');
    
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.setStatus = 200;
            break;
        case '/about':
            path += 'about.html';
            res.serStatus = 200;
            break;
        case '/about-me':
            res.setHeader('Location','/about');
            res.setStatus = 301;
            break;
        default:
            path += 'error.html';
            res.setStatus = 404;
            break;
    }
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            res.write(data);
        }
        res.end();
    });   

});
server.listen(4000, () =>{
    console.log('Server started at 4000');
}); 