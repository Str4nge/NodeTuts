//this file is used as a module
//this module contains some function about calculations

function add(a, b){
    return a+b;
}

function sub(a, b){
    return a-b;
}

//exporting add() as a property add so that it is available for the file in which this object is imported.
module.exports.add = add;
module.exports.sub = sub;
