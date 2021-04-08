const express = require('express');
const mongoose = require('mongoose'); //used database management
const Blog = require('./models/blog');

//express app
const app = express();

//connecting to MongoDB atlas connection string
const dbURI = 'mongodb+srv://kyodaina:vishal@nodetuts.5vqll.mongodb.net/Node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology:true } ) //then part will run after the async func is completed
.then((result) => {
    console.log('connected to database');               //here we are listening after the connection to the database is made.
    app.listen(4000, () => {
        console.log('Server started at 4000');
    });
}).catch((err) => console.log(err)) ;

//registering view engine
app.set('view engine', 'ejs');
// it takes the default view model is in views directory. To specify any other folder for view 
//you can specify in app.set('views', 'viewDirectory');


//middelware for static files.
//by default any file can not be served by the express app. to make available any static file
//to public we can use static() from express.
app.use(express.static('public'));

//here all static files put in public folder will be made available from server.

app.use((req, res, next) => {
    console.log('Request made', req.url);
    console.log('host:', req.hostname);
    console.log('method:', req.method);
    next();
});

//get method responding to a '/' url route
//Here we are just rendering the view inside Get
app.get('/', (req, res) =>{
    //sending data objects along with rendering.
    // const blogs = [
    //     {title:'who was been messing up everything?', body:'It`s been AGATHA all along'},
    //     {title:'who was been pulling every evil string?', body:'It`s been AGATHA all along'},
    //     {title:'It`s too late to fix anything', body:'Now that everything has gone wrong'},
    //     ];

    // res.render('index',{title:"Home Page", blogs:blogs});
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about',{title:"About Page"});
});

//finding the data from the database and sending to the view 
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt:-1})
    .then((result) => res.render('index',{title: 'All Blogs', blogs: result}) )
    .catch((err) => console.log(err));
});
 
app.get('/blogs/create', (req, res) => {
    res.render('createBlog',{title:"Create New Page"});
});

//if any of the routes in get method doesnot matches to the url this middleware runs
//error page
app.use((req, res) => {
    res.status(404).render('error',{title:"Error Page"});
});