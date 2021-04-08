const mongoose = require ('mongoose');
const Schema = mongoose.Schema;  

//the schema defines the structure of the document that we are gonna store in collection
//the models are made by wrapping the schema and providing interface to deal with the collection documents

const blogSchema = new Schema({
 title:{
     type: String,
     required:true
 },
 author:{
    type: String,
    required:true
},
body:{
    type: String,
    required:true
}
},{ timestamps: true});

const Blog = mongoose.model('Blog', blogSchema ); // it will check in the 'blogs' collection related to the model 'blog'

module.exports = Blog;

