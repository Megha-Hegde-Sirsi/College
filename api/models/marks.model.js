var mongoose = require('mongoose');
var Marks = mongoose.model('Marks', {
    studentID: {
        type: String,
        required: true
    },
    subjectID: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
})

module.exports = { Marks }