'use strict'

var mongoose = require('mongoose'),
     User    = mongoose.model('User'),
     Place   = mongoose.model('Place'),
     Task    = mongoose.model('Task');

/*=======================================
* POST: Adds a new user (signup)
=======================================*/
exports.addUser = (req, res) => {
    var new_user = new User(req.body);
    new_user.save((err, user) => {
        if(err){
            if(err.code == 11000)
              res.send("Email "+ req.body.email  +
              " is already in Use, choose another email.");
          }
        res.json(user);
    })
};
/*=======================================
* GET: Search for user using email Login
=======================================*/
exports.login = (req, res) => {
    var email = req.body.email;
    User.find({email}, (err, user) =>{
        if(err){
          res.send(err);
        }
        if(user.length == 0){
          res.send("User not found");
        }
        res.send(user);
    })
};

/*=======================================
* GET: Returns all the users
=======================================*/
exports.listAllUsers = (req, res) => {
  run().catch(error => console.error(error));

  async function run() {
    const users = await User.find({}).sort({name:1}).populate('places');
    res.json(users);
  }
}
/*=======================================
* GET: Returns certain User
=======================================*/
exports.searchUser = (req, res) => {
  run().catch(error => console.error(error));

  async function run() {
    const user = await User.findById(req.params.userId)
        .sort({names:1})
        .populate('places');

          res.json(user);
  }
}
/*=======================================
* POST: Updates a user
=======================================*/
exports.updateUser = (req, res) => {
    User.findOneAndUpdate({_id:req.params.userId}, req.body, {new:true}, (err, user)=>{
        if(err)
            res.send(err)
        res.json(user);
    })
};
/*=======================================
*POST:Delete a user
=======================================*/
exports.deleteUser = (req, res) => {
    User.remove({_id:req.params.userId}, (err,user) =>{
        if(err){res.send(err) }
        else{
            res.json({message:"user deleted"});
            //TODO Delete all task and places from
            //the databse conrresponding to the user
        }
    })
}
/*========================================================================*/
