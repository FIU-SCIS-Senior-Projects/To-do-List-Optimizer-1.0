'use strict'

var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    Place    = mongoose.model('Place'),
    Task   = mongoose.model('Task');


/*=======================================
* POST: Adds a new place
=======================================*/
exports.add_place = (req, res) => {
    User.findById(req.params.userId, (err, user)=>{
        if(err){
          res.send(err)
        }
        else{
            var place = new Place({
                name : req.body.name,
                author : req.params.userId
            });
            place.save((err, place) =>{
              if(err) {res.send(err) }
              else{ res.json(place); }
            });
          }
    });
}
/*=======================================
    * GET: Finds a place
=======================================*/
exports.search_place = (req, res) => {
    Place.findById(req.params.placeId, (err, place) =>{
        if(err){
          res.send(err)
        }
        res.json(place);
    });
}
/*=======================================
    * GET: display_all places
=======================================*/
exports.display_all = (req, res) => {
    var user = {author:req.params.userId}
    Place.find({user}, (err, places) =>{
      if(err){
        res.send(err)
      }
      res.json(places);
    });
}
