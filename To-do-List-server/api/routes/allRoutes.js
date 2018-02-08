'use strict'

module.exports = function(app){
    var user  = require('../controllers/userApiControllers');
    var place = require('../controllers/placeApiControllers');
    var task  = require('../controllers/taskApiControllers');
        /*   User Api*/
    app.route('/user/add')
        .post(user.add_a_user);
    app.route('/user/display_all')
        .get(user.list_all_users);
    app.route('/user/update/:userId')
        .put(user.update_a_user);
    app.route('/user/delete/:userId')
        .delete(user.delete_user);
    app.route('/user/search/:userId')
        .get(user.search_user);

        /*   Places Api*/
    app.route('/:userId/place/add')
        .post(place.add_place);
    app.route('/:userId/place/search/:placeId')
        .get(place.search_place);
    app.route('/:userId/places')
        .get(place.display_all);


          /*  Task Api*/
    app.route('/:placeId/addTask')
        .post(task.add_task);
    app.route('/task/update/:taskId')
        .put(task.update_task);
    app.route('/task/search/:taskId')
        .get(task.search_task);

};
