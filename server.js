const http = require('http');
const express = require('express');

//express app
const app = express();

//server listen to port 4000
app.listen(4000, () => {
    console.log('Server started at 4000');
});

//get method responding to a '/' url route
//using res.send() we do not need to setStatus code or Header for response
//We can either send data aur we can send files
app.get('/', (req, res) =>{
    console.log(req.url);
    res.send('<p>Home page</p><br><a href = "/about">About</a><br><a href = "/home">Home</a>');
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html',{root:__dirname});  
});

app.get('/home', (req, res) => {
    res.sendFile('./views/index.html', {root:__dirname});
});

//redirecting a get path
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//if any of the routes in get method doesnot matches to the url
//error page
app.use((req, res) => {
    res.status(404).sendFile('./views/error.html',{root:__dirname});
})