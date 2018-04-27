var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true
    },
    email:{
      type:String,
      required: true,
      trim: true
    },
    password:{
      type:String,
      required: true,
      trim: true
    },
    phone: {
      type:String,
      trim: true
    }}, {toObject: {virtuals:true},
          toJSON: {virtuals: true}
          });
    UserSchema.virtual('places', {
      ref:'Place',
      localField: '_id',
      foreignField: 'author',
      justOne: false
    });

var User = mongoose.model('User', UserSchema);
module.exports =  User;
