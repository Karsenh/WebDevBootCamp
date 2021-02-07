const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

var tasksArray = ["test 1", "test line 2"];
var workTasksArray = ["Email everyone back", "File tps reports"];

app.get('/', function(req, res) {

    let dateFormatted = date.getDate();

    res.render('list', {listTitle: dateFormatted, Tasks: tasksArray});
});

app.post('/', function(req, res) {
    var newItem = req.body.newTask;

    console.log(req.body.list);

    if (req.body.list === 'Work') {
        workTasksArray.push(newItem);
        res.redirect('/Work');
        console.log(req.body.list);
    } else {
        tasksArray.push(newItem);
        res.redirect('/');
        console.log(req.body.list);
    }
    
});

app.get('/Work', function(req, res) {
    res.render('list', {listTitle: "Work", Tasks: workTasksArray})
})


app.listen(3000, function() {
    console.log("Successfully started server on port 3000!");
});