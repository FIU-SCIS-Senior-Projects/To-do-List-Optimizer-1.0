var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
   author:{
     type: mongoose.Schema.Types.ObjectId, ref:'User'
  }

});

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
