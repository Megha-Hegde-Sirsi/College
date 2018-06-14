var mongoose = require('mongoose');

var Staff = mongoose.model('Staff', {
    staffID: {
        type: String,
        required: true,
        unique: true
    },
    basicDetails: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        contact: {
            type: Number,
            required: true,
            minLength: 10,
            maxLength: 10
        },
        address: {
            type: String,
            minLength: 5,
            trim: true,
            required: true
        },
        qualification: {
            type: String,
            required: true,
            trim: true,
            minLength: 2
        }
    },
    roleID: {
        type: String,
        required: true
    }
})

module.exports = { Staff }