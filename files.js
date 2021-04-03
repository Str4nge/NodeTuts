const fs = require('fs')

//reading a file
fs.readFile('./docs/blog2.txt',(err,data)=>{
    if (err){
        console.log(err)
        return
    }
    console.log(data.toString())
})

//writing files
fs.writeFile('./docs/blog2.txt',"Hey, I am Vishal.",()=>{
    console.log("Writing blog2...")
}) 

//reading and writing 
fs.writeFile('./docs/blog1.txt',"Hey, I am Huge.",()=>{
    console.log("Writing blog1...")
    fs.readFile('./docs/blog1.txt',(err,data)=>{
        if (err){
            console.log(err)
            return
        }
        console.log(data.toString())
    })
})

//working with directories

//creating new directories
fs.mkdir('./docs/assets',(err) =>{
    if(err){
        console.log(err)
    }
    console.log('created directory')
})

//checking if folder exists 
if(fs.existsSync('./docs/assets')){
    console.log('Folder already exists')
}
else{
    console.log("Folder does not exists.")
}

//deleting files
if (fs.existsSync('./docs/blog2.txt')){
    fs.unlink('./docs/blog2.txt',(err)=>{
        if(err){
            console.log(err)
        }
        console.log("File deleted")
    })
}

//rmdir and mkdir
if (fs.existsSync('./assets')){
    fs.rmdir('./assets',(err)=>{
        if(err){
            console.log(err)
        }
        console.log('directory found and deleted')
    })
}
else{
    fs.mkdir('./assets',(err)=>{
        if(err){
            console.log(err)
        }
        console.log('directory nor found, created new one')
    })
}