// require library
const mongoose = require('mongoose');

// connect to datatbase
mongoose.connect('mongodb+srv://Prateeksha:prateeksha0209@cluster0.cpeh6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


// acquire connection(check is successfull)
const db = mongoose.connection;


// error
db.on('error',console.error.bind('error connecting to db.'));


// up in running
db.once('open',function(){
    console.log('db connected');
});
