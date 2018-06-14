var mongoose = require('mongoose');

var Department_Staff = mongoose.model('Department_Staff', {
    departmentID: {
        type: String,
        required: true
    },
    staffID: {
        type: String,
        required: true
    },
    roleID: {
        type: String,
        required: true
    }
})

module.exports = { Department_Staff }