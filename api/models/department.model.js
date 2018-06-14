var mongoose = require('mongoose');

var Department = mongoose.model('Department', {
    departmentName: {
        type: String,
        required: true,
        trim: true
    },
    departmentID: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    }
})

module.exports = { Department }