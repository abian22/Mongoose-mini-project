const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    job: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model("User", userSchema)