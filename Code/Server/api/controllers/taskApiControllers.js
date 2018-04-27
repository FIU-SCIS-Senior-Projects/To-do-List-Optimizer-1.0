'use strict'

var mongoose = require('mongoose'),
User    = mongoose.model('User'),
Place   = mongoose.model('Place'),
Task     = mongoose.model('Task');


/*=============================
POST: add Tasks
=============================*/
exports.addTask = (req, res) => {

  auth(req,res,(id) => {Place.findById(req.params.placeId, (err, user)=>{
    if(err){
      res.send(err)
    }
    else{
      if (id === user._id){
        var task = new Task({
          name: req.body.name,
          place: req.params.placeId
        });
        task.save((err, task) =>{
          if(err){ res.send(err)}
          else{ res.json(task); }
        });
      }
      else {
        return res.status(401).send({
          auth: false,
          message: 'Failed to authenticate token.' });
      }
    }
  });
});
}
/*=============================
POST: Update Task
[name, place and completion]
=============================*/
exports.updateTask = (req, res) => {

  Task.findOneAndUpdate(req.params.taskId, req.body, {new:true}, (err, place) =>{
    if(err)
    res.json(err);
    res.json(place);
  });
};
/*=============================
DELETE: Delete Task
=============================*/
exports.deleteTask =  (req, res) => {
  Task.remove({_id:req.params.taskId}, (err, task) => {
    if(err){res.send(err)}
    else{
      res.json({message:"Task Deleted"});
    }
  })
};
