'use strict'

var mongoose = require('mongoose'),
User    = mongoose.model('User'),
Place   = mongoose.model('Place'),
Task    = mongoose.model('Task');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

let ONE_MONTH = (86400 * 30);

const DEBUG = true;
var myConsole = (DEBUG)? console.log : function(){};

/*=======================================
* POST: Adds a new user (signup)
=======================================*/
exports.addUser = (req, res) => {

  myConsole()
  var hashedPass = bcrypt.hashSync(req.body.password, 8);

  myConsole("email: " + req.body.email + "hashed password: " + hashedPass + "\n");

  User.create({
    name:req.body.name,
    email: req.body.email,
    password: hashedPass
  },
  (err, user) => {
    if(err){
      myConsole("\nerror creating user\nerror:" + err + "\n");
      if(err.code == 11000)
      {
        return res.status(500).send(
          "Email " + req.body.email  +
          " is already in Use, choose another email.");
        }
        myConsole("\nerror creating user\nerror code:" + err.code + "\n");
        return res.status(500).send(
          "There was a problem registering the user."
        );
      }


      var token = jwt.sign(
        { id : user._id },
        config.secret,
        {expiresIn: ONE_MONTH}
      );
      var authenticated = { auth: true, token: token };

      res.status(200).json(authenticated);
    });
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
      if(req.params.userId.length != 24){
        res.json("User Id is wrong");
      }
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
