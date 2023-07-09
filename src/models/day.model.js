const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Day', weekdaySchema);
