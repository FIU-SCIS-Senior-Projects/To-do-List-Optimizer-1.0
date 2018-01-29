'use strict'

var mongoose = require('mongoose'),
     User    = mongoose.model('User'),
     Place   = mongoose.model('Place'),
     Task     = mongoose.model('Task');


/*=============================
  POST: add Tasks
=============================*/
exports.add_task = (req, res) => {
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
  (name, place and completion)
=============================*/
exports.update_task = (req, res) => {
  var taskId = {_id:req.params.taskId};
  Task.findOneAndUpdate({taskId}, req.body, {new:true}, (err, task)=>{
    if(err)
      res.send(err)
    res.json(task);
  })
};

/*=============================
GET: search Task
=============================*/
exports.search_task = (req, res) => {
  Task.findById(req.params.taskId, (err, task) => {
      if(err)
          res.send(err)
      res.json(task);
  })
}
