'use strict'

module.exports = function(app){
    var user  = require('../controllers/userApiControllers');
    var place = require('../controllers/placeApiControllers');
    var task  = require('../controllers/taskApiControllers');


/*=============================================================================
 * ************ Endpoints for all the User related functions ***************
 *
 *   signup      => Allows the user to create an account.
 *   login       => Allows the user to login to an existing acccount.
 *                  Need to create password verification, only email now
 *   displayAll => Allows the developer to see all the users in the application
 *   updateUser => Allows the user to update their information
 *   searchUser => Allows to search for user using the userId. It shows all the
 *                   information for that user.
=============================================================================*/
    app.route('/signup').post(user.addUser);
    app.route('/login').post(user.login);
    app.route('/user/display_all').get(user.listAllUsers);
    app.route('/user/update/:userId').put(user.updateUser);
    app.route('/user/delete/:userId').delete(user.deleteUser);
    app.route('/user/search/:userId').get(user.searchUser);

/* =============================================================================
 * ********* Endpoints for all the User related functions   **********
 *
 * addPlace    => Alows the user to add a place to their itinerary and links it
 *                to the user by their userId
 * displayAll  => Allows to display all the places for an user using their userId
 * updatePlace => Allows the user to update the information.
 * ============================================================================*/


    app.route('/:userId/place/add').post(place.addPlace);
    app.route('/:userId/places').get(place.displayAll);
    app.route('/places/update/:placeId').put(place.updatePlace);
    app.route('/places/delete/:placeId').delete(place.deletePlace);

/* =============================================================================
 * ********* Endpoints for all the Task related functions   **********
 *
 *  addTask => Allows user to add task to a certain place
 *
 *
 *
 * ===========================================================================*/
    app.route('/:placeId/addTask').post(task.addTask);
    app.route('/task/update/:taskId').put(task.updateTask);
    app.route('/task/delete/:taskId').delete(task.deleteTask);


};
