var mongoose = require('mongoose'),
    Place    = require('./placeSchema.js'),
    placeSchema = mongoose.model('Place').schema,
    Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        //required: true,
        trim: true,
        unique: true,
    },
    phone: {
        type: String,
        //required: true,
        trim: true
    },
    places: [{type: Schema.Types.ObjectId, ref:'Place'}]
});


var User = mongoose.model('User', UserSchema);
module.exports =  User;


// places : [{
//   type : mongoose.Schema.Types.ObjectId,
//   ref: 'Place',
// }],
