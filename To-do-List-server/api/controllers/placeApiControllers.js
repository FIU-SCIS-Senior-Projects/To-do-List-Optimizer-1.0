'use strict'

var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    Place    = mongoose.model('Place');


    /*=======================================
    * POST: Adds a new placer and update user
    =======================================*/
exports.add_place = (req, res) =>{
  var owner = {_id:req.params.userId}
  var place = new Place(req.body);
  place.save((err, place) => {
      if(err)
          res.send(err)
      res.json(place);
    })

}
