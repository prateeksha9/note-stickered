const express = require('express'); 
const path = require('path'); 
const port = process.env.PORT || 80 
const db = require('./config/mongoose');
const app = express(); // storing express

const Task = require('./model/todo');
const moment = require('moment');

// view mein HTML and CSS
app.set('view engine', 'ejs'); //name of view engine
app.set('views', path.join(__dirname, 'views')); //path of views
app.use(express.urlencoded()); //signifies middleware
app.use(express.static('assets'));


app.get('/', function(req, res){

    Task.find({},function(err,task){
        if(err){
            console.log('Cannot Fetch Task');
            return;
        }

        return res.render('home', {
            title:"My Task List",
            ToDo_List : task
        });
    })
});

app.post('/create-task', function(req,res){
    var newDate = req.body.date;
    console.log('newDate', newDate)
    newDate = moment(newDate, 'YYYY/MM/DD').format('dddd MMMM D Y');
    console.log(newDate);

    Task.create({
        task: req.body.task,
        categories: req.body.categories,
        date: newDate,
        
    }, function(err, newTask){
        if(err){console.log('Cannot Add Task'); 
        return;
    } 
        console.log('*********', newTask);
        return res.redirect('back');
    });



});

app.get('/delete-task', function(req, res){
    console.log(req.query);

    // get id from query url
    let id = req.query.id;

    Task.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting');
            return;
        }

        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if (err){
        console.log('Error in printing the server', err);
    }
    console.log('Yup! express is running on port:', port);
})