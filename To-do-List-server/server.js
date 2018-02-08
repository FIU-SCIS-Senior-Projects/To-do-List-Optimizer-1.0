/*For Testing purposes in  database, to be implemented
  with app.js later on
*/

var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    mongoose = require('mongoose'),
    User = require('./api/models/userSchema'), //created model loading here
    Place = require('./api/models/placeSchema'),
    Task = require('./api/models/taskSchema'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://milonga:eshijadelcandombe@ds249707.mlab.com:49707/armageddon_project_db');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/allRoutes'); //importing rout
routes(app); //register the route

app.listen(port);
console.log("*************************************************");
console.log('todo list RESTful API server started on: ' + port);
