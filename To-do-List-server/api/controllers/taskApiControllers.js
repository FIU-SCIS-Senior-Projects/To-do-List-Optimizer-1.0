'use strict'

var mongoose = require('mongoose'),
     User    = mongoose.model('User'),
     Place   = mongoose.model('Place'),
     Task     = mongoose.model('Task');


/*=============================
  POST: add Tasks
=============================*/
exports.addTask = (req, res) => {
  Place.findById(req.params.placeId, (err, user)=>{
      if(err){
        res.send(err)
      }
      else{
        var task = new Task({
          name: req.body.name,
          place: req.params.placeId
        });
        task.save((err, task) =>{
          if(err){ res.send(err)}
          else{ res.json(task); }
        });
      }
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
