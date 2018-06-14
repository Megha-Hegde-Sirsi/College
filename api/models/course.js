var mongoose = require('mongoose');

var Course = mongoose.model('Course', {
  courseID: {
    type: String,
    required: true
},
courseName: {
    type: String,
    required: true,
    trim: true
},
staffID: {
    type: String
}
});

module.exports = { Course };
