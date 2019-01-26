var express = require("express"), // framework of NodeJS for an easy server config
    bodyParser = require("body-parser"), // module for parsing JSON on requests body
    methodOverride = require('method-override'), // module for override HTTP methods
    mongoose = require("mongoose"); // ORM module for mongoDB integration

// Express app
var app = express();

//app.configure(function () {
// static files folder todo: corregir
app.use(express.static(__dirname + '/static'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
// Override http methods
app.use(methodOverride());
//});

// ---------------------------------------------------------

// mongodb://<dbuser>:<dbpassword>@ds113495.mlab.com:13495/todo_app_db
// Connection to the database
const db_name = 'todo_app_db',
    db_user = 'kpedrozag',
    db_pass = 'mongopass123',
    db_host = "ds113495.mlab.com",
    db_port = '13495';

const url = `mongodb://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`;
mongoose.connect(url, {useNewUrlParser: true}, function (error, response) {
    if(error) {
        console.log('ERROR: Unable to connect to database. ' + error);
    }
    else {
        console.log('Connection to database successful.');
    }
});

// ---------------------------------------------------------

var log_model = require('./models/log')(mongoose);

// Load of the controllers and db models.
var user_model = require("./models/user")(mongoose),
    user_ctrl = require("./controllers/user");

var task_model = require("./models/task")(mongoose),
    task_ctrl = require("./controllers/task");

// ---------------------------------------------------------

var t_routing = require("./routes/task")(express, app, task_ctrl);
var u_routing = require("./routes/user")(express, app, user_ctrl);
var g_routing = require("./routes/general")(express, app);

// ---------------------------------------------------------

// Deploy the server running on port 8888
app.listen(8888, function () {
    console.log("API running on port 8888");
});
