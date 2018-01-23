'use strict'

var mongoose = require('mongoose'),
     User = mongoose.model('User');
     //Task = mongoose.model('Task')

/*=======================================
* POST: Adds a new user
=======================================*/
exports.add_a_user = (req, res) => {
    var new_user = new User(req.body);
    new_user.save((err, user) => {
        if(err)
            res.send(err)
        res.json(user);
    })
};

/*=======================================
* GET: Returns all the users
=======================================*/
exports.list_all_users = (req, res) => {
    User.find({}, (err, user) => {
        if(err){
            res.send(err)
        }
        if(user.length == 0){
            res.json("message: empty list of users");
        }
        res.json(user);
    });
};

/*=======================================
* GET: Returns certain User
=======================================*/
exports.search_user = (req, res) => {
    User.findById(req.params.userId, (err, user)=>{
        if(err)
            res.send(err)
        res.json(user);
    })
}
/*=======================================
* POST: Updates a user
=======================================*/
exports.update_a_user = (req, res) => {
    var userId = {_id:req.params.userId}
    User.findOneAndUpdate({userId}, req.body, {new:true}, (err, user)=>{
        if(err)
            res.send(err)
        res.json(user);
    })
};
/*=======================================
*POST:Delete a user
=======================================*/
exports.delete_user = (req, res) => {
    User.remove({_id:req.params.userId}, (err,user) =>{
        if(err)
            res.send(err)
        res.json({message:"user deleted"});
    })
}
/*========================================================================*/
