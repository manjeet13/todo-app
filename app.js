var express         = require("express"),
    mongoose        = require("mongoose"),
    Todo            = require("./models/todo"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    configs         = require("./configs/index.js");

var app = express();

//connect to the database
mongoose.connect(configs.dbUrl);


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
//set view engine
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


//home route
app.get('/', function(req, res){
    res.redirect("/todos");
});

//the index route
app.get('/todos', function(req, res){
    Todo.find({}, function(err, todos){
        if(err){
            console.log(err);
        } else{
            res.render("index", {todo: todos});
        }
    });
});


//CREATE new todo
app.get('/todos/new', function(req, res) {
    res.render("new");
});


//POST
app.post('/todos', function(req, res){
    Todo.create({task: req.body.todo}, function(err, todo){
        if(err){
            console.log(err);
        } else {
            res.json(todo);
        }
    });
});


//EDIT route
app.get('/todos/:id/edit', function(req, res) {
    Todo.findById(req.params.id, function(err, todo){
        if(err){
            console.log(err);
        } else {
            res.render("edit", {todo: todo});
        }
    });
});


//UPDATE route
app.put('/todos/:id', function(req, res){
    Todo.findByIdAndUpdate(req.params.id,{task: req.body.todo}, function(err, todo){
        if(err){
            console.log(err);
        } else {
            res.redirect("/todos");
        }
    });
});


//DELETE route
app.delete('/todos/:id', function(req, res){
    Todo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/todos");
        }
    });
});


//listen to the server PORT
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("ToDo app is up and running");
});