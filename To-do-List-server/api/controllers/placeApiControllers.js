'use strict'

var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    Place    = mongoose.model('Place');


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
    * POST: Finds a place
=======================================*/
exports.search_place = (req, res) => {
      res.json("searching Place")

    //placeId = req.params._id;
    //   Place.findOne({name: 'CVS'}).populate('author').exec((err, place) =>{
    //     if(err){ res.send(err) }
    //     else{
    //         console.log('The Owner of the place is %s', place.author.name);
    //     }
    // })
}
