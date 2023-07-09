const mongoose = require ("mongoose");

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
        match: /^\d{2}:\d{2}$/,
        message: "The 'time' field must have a valid time format (HH:MM)."
    },
    completed: {
        type: Boolean,
        default: false
    
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
})

module.exports = mongoose.model("Task", taskSchema)