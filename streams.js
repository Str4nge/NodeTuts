const fs = require('fs')
const readStream = fs.createReadStream('./bigBlog.txt',{encoding:'utf8'})
//{encoding:'utf8'} JSON object is optional used to set the encoding to utf format and the 
//chunks comes in readable form

const writeStream = fs.createWriteStream('./tinyBlog.txt')

//.on() is an event listener that checks for a new
//event (here event called 'data') and runs the function ON the 
//happening of that event at the object (here object is readStream)

readStream.on('data',(chunk)=>{
    console.log('--- New CHUNK ---')
    console.log(chunk)
    writeback(chunk)
})

//writeback() is writing the read chunk in new file using writeStream
function writeback(data){
    writeStream.write(data)
    writeStream.write('\n--New Chunk--\n')
}