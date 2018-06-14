var mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    // id: {
    //     type: String,
    //     required: true,
    //     minlength: 1,
    //     trim: true
    // },
    // name: {
    //     type: String,
    //     required: true,
    //     minlength: 1,
    //     trim: true
    // },
    // address: {
    //     type: String,
    //     default: null
    // },
    // contact: {
    //     type: Number,
    //     default: null
    // },
    // score: {
    //     type: Number,
    //     default: 00
    // },

    studentID: {
        type: String,
        required: true
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
            required: true,
            minLength: 5,
            trim: true
        }
    },
    departmentID: {
        type: String,
        required: true
    },
    subjects: [{
        subjectID: {
            type: String
        }
    }]
});

module.exports = { Student };
