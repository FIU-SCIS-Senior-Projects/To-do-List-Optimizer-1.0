var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var PlaceSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
   author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
   }}, { toObject: {virtuals:true},
         toJSON: {virtuals:true}
      });
    PlaceSchema.virtual('tasks', {
      ref: 'Task',
      localField: '_id',
      foreignField: 'author',
      justOne: false
    });

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
