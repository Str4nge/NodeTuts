const express = require('express');
const mongoose = require('mongoose'); //used database management
const Blog = require('./models/blog');

//express app
const app = express();

//connecting to MongoDB atlas connection string
const dbURI = 'mongodb://localhost:27017/Nodetuts?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology:true } ) //then part will run after the async func is completed
.then((result) => {
    console.log('connected to database');               //here we are listening after the connection to the database is made.
    app.listen(4000, () => {
        console.log('Server started at 4000');
    });
}).catch((err) => console.log(err)) ;

//registering view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));      //middleware to encode the data coming through url into an object

app.use((req, res, next) => {
    console.log('Request made', req.url);
    console.log('host:', req.hostname);
    console.log('method:', req.method);
    next();
});

app.get('/', (req, res) =>{
    // res.render('index',{title:"Home Page", blogs:blogs});
    //just redirecting to /blogs path
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about',{title:"About Page"});
});

// make a record using model constructor and save it to the database.
// app.get('/new', (req, res) => {
//     const record = new Blog({
//         title:'New blog 2',
//         author:'name2',
//         body:'This is the dummy line'
//     });
//     record.save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

//finding the data from the database and sending to the view 
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt:-1})
    .then((result) => res.render('index',{title: 'All Blogs', blogs: result}) )
    .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then( (result) => res.render('blogDetail',{title:"Blog detail", blog:result}) )
    .catch( (err) => {
        res.render('error', { title:"Blog not found"});
        console.log(err);
    } ); 
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then( (result) => res.json({ redirect: '/blogs' }) )
    .catch( (err) => console.log(err) );
});

app.post('/blogs', (req, res) =>{
    console.log(req.body);   //the data coming from frontend (submitted form) is encoded in request body 
    const record = new Blog(req.body);      //create the new record instance using the request body object.
    
    record.save()
    .then( (result) => res.redirect('/blogs') )
    .catch( (err) => console.log(err) );
});
 
app.get('/blog/create', (req, res) => {
    res.render('createBlog',{title:"Create New Page"});
});

//if any of the routes in get method doesnot matches to the url this middleware runs
//error page
app.use((req, res) => {
    res.status(404).render('error',{title:"Error Page"});
});