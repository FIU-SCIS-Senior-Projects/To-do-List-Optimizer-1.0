'use strict'

var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    Place    = mongoose.model('Place'),
    Task   = mongoose.model('Task');
var auth = require('./authenticate');


/*=======================================
* POST: Adds a new place
=======================================*/
exports.addPlace = (req, res) => {


  auth(req, res, User.findById(id, (err, user)=>{
        if(err){
          res.send(err)
        }
        else{
            var place = new Place({
                name : req.body.name,
                author : id
            });
            place.save((err, place) =>{
              if(err) {res.send(err) }
              else{ res.json(place); }
            });
          }
    })
  );
}
/*=======================================
    * GET: display_all places for an user
=======================================*/
exports.displayAll = (req, res) => {
    var user = req.params.userId;

    Place.find({author: user}, (err, places) =>{
      if(err){
        res.send(err)
      }
      res.json(places);
    });
}

/*=======================================
  * PUT : Update a place [name, location]
=======================================*/
exports.updatePlace = (req, res) => {
    //console.log(req.params.placeId);

    Place.findOneAndUpdate(req.params.placeId, req.body, {new:true}, (err, place) =>{
      if(err)
        res.json(err);
      res.json(place);
    });
}
/*=======================================
  * PUT : Update a place [name, location]
=======================================*/
exports.deletePlace = (req, res) => {
  console.log(req.params.placeId);

  Place.remove({_id:req.params.placeId}, (err, user) =>{
    if(err) {res.send(err)}
    else {
      res.json("Place has been Deleted");
      //Todo remove task in the place
    }
  });
}











// /*=======================================
//     * GET: Finds a place
// =======================================*/
// exports.search_place = (req, res) => {
//     Place.findById(req.params.placeId, (err, place) =>{
//         if(err){
//           res.send(err)
//         }
//         res.json(place);
//     });
// }
