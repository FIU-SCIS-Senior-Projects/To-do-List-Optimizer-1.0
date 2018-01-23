'use strict'

module.exports = function(app){
    var user = require('../controllers/userApiControllers');

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

    // app.route('/task')
    //     .post(user.add_task)
};
