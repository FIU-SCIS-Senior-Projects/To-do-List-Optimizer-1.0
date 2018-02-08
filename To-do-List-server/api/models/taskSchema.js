var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    place :{
      type: mongoose.Schema.Types.ObjectId, ref:'Place'
    },
    //time_frame: TimeFrameSchema,
    completed: {
        type: Boolean,
        default: false
    }
});

var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
