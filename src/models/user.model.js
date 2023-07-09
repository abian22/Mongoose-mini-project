const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        allowNull: true,
        default:"user"
    },
    tasks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task'
        }
      ]
    });

module.exports = mongoose.model("User", userSchema)