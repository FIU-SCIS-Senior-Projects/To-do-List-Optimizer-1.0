var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var User = require('./api/models/userSchema.js'); //created model loading here
var Place = require('./api/models/placeSchema');
var Task = require('./api/models/taskSchema');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://milonga:eshijadelcandombe@ds249707.mlab.com:49707/armageddon_project_db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./api/routes/allRoutes'); //importing routes
routes(app); //register the route


app.listen(port);
console.log("*************************************************");
console.log('todo list RESTful API server started on: ' + port);

app.get('*', function(req, res){
  res.send('Page not found!!!', 404);
});

module.exports = app;
