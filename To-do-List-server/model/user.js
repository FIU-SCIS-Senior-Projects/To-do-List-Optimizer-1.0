var mongoose = require('mongoose');


var LocationSchema = new mongoose.Schema({

    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});


var TimeFrameSchema = new mongoose.Schema({
    start: {
        type: Date
    },
    end: {
        type: Date
    }
});

var TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    time_frame: TimeFrameSchema,
    completed: {
        type: Boolean,
        default: false
    }
});

var PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    location: LocationSchema,

    task: [TaskSchema]
});




var CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    places: [PlaceSchema]
});



var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    list_categories: [CategorySchema]


    // timeStamp: {
    //     type: Date,
    //     required: false
    // }

});


var User = mongoose.model('User', UserSchema);
module.exports = User;