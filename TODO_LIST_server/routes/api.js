var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {




    res.render('index', { title: 'Express' });
});




/* POST add user. */
router.get('/login', function(req, res, next) {

    res.render('index', { title: 'Express' });
});

/**********************************************************************************************************************/
/* POST requests */
// add new category


// add new place


// add new task



/**********************************************************************************************************************/
/* GET requests */
// get list of task


// get list of places


// get categories







module.exports = router;

