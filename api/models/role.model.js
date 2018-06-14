var mongoose = require('mongoose');

var Role = mongoose.model('Role', {
    roleID: {
        type: String,
        required: true
    },
    roleName: {
        type: String,
        required: true
    }
})

module.exports = { Role }