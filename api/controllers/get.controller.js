"use strict"
const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
var { mongoose } = require('.././db/mongoose');

var { Student } = require('../models/student')
var { Course } = require('../models/course')
var { Department } = require('../models/department.model');
var { Marks } = require('../models/marks.model');
var { Staff } = require('../models/staff.model')

let router = express.Router();

router.get('/retrieveAll/:data', (req, res) => {
    const allStudents = new Array();
    const allCourses = new Array();
    const allDepartment = new Array();
    const allMarks = new Array();
    const allStaff = new Array();
    const Result = new Array();
    let errStatus;
    const allPromise = new Array();

    const param = req.params.data.toString();

    console.log(param);

    switch (param) {
        case 'Student': getAllStudents();
            break;
        case 'Course': getAllCourse();
            break;
        case 'Marks': getAllMarks();
            break;
        case 'Department': getAllDepartment();
            break;
        case 'Staff': getAllStaff();
            break;
        default: break;
    }

    function getAllStudents() {
        Student.find({}, (err, doc) => {
            if (err || !doc) {
                console.log("either error or no document", err);
                res.status(404).send("either err or no data", err);
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function getAllCourse() {
        Course.find({}, (err, doc) => {
            if (err || !doc) {
                console.log("either error or no document", err);
                res.status(404).send("either err or no document", err)
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function getAllMarks() {
        Marks.find({}, (err, doc) => {
            if (err || !doc) {
                console.log("Either err or no document", err);
                res.status(404).send("either err or no document", err);
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function getAllDepartment() {
        Department.find({}, (err, doc) => {
            if (err || !doc) {
                console.log("Either err or no document", err);
                res.status(404).send("Either err or no document", err)
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function getAllStaff() {
        Staff.find({}, (err, doc) => {
            if (err || !doc) {
                console.log("Either err or no document", err);
                res.status(404).send("Either err or no document", err);
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

})

router.get('/retrieve/Student/', (req, res) => {
    console.log(req.query);
    const param = req.query;
    const info = JSON.stringify(param);
    const result = info.split("\"");
    console.log(result)
    switch (result[1]) {
        case 'ID': getStudentById();
            break;
        case 'name': getStudentByName();
            break;
        case 'contact': getStudentByContact();
            break;
        default: break;
    }

    function getStudentById() {
        console.log(param);
        console.log(param.ID)
        Student.find({ studentID: param.ID }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given ID");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })

    }

    function getStudentByName() {
        Student.find({ 'basicDetails.name': param }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given name");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

    function getStudentByContact() {
        Student.find({ 'basicDetails.contact': param }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given contact");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

})

router.get('retrieve/Course/', (req, res) => {
    console.log(req.query);
    const param = req.query
    const info = JSON.stringify(param);
    const result = info.split("\"");
    console.log(result)
    switch (result[1]) {
        case 'ID': getCourseByID();
            break;
        case 'name': getCourseByName();
            break;
        default: break;
    }

    function getCourseByID() {
        Course.find({ courseID: param.ID }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given ID");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

    function getCourseByName() {
        Course.find({ courseName: param.name }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given name");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }
})

router.get('/retrieve/marks/', (req, res) => {
    console.log(req.query);
    const param = req.query;
    const info = JSON.stringify(param);
    const result = info.split("\"");
    console.log(result)
    switch (result[1]) {
        /**
         * studentID
         * subjectID
         * studentID and subjectID
         */
        case 'studentID': getMarksByStudentID();
            break;
        case 'subjectID': getMarksBySubjectID();
            break;
        default: if (param.subjectID && param.studentID) {
            getMarksByStudentAndSubjectID()
        }
            break;
    }

    function getMarksByStudentID() {
        Marks.find({ studentID: param.studentID }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given studentID");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }
    function getMarksBySubjectID() {
        Marks.find({ subjectID: param.subjectID }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given subjectID");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

    function getMarksByStudentAndSubjectID() {
        Marks.find({ studentID: param.studentID, subjectID: param.subjectID }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given studentID and subjectID");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }
})
router.get('/retrieve/department', (req, res) => {
    console.log(req.query);
    const param = req.query;
    const info = JSON.stringify(param);
    const result = info.split("\"");
    console.log(result)
    switch (result[1]) {
        /**
         * departmentName
         * departmentID
         */
        case 'departmentName': getDepartmentByName();
            break;
        case 'departmentID': getDepartmentByID();
            break;
        default: break;
    }

    function getDepartmentByName() {
        Department.find({ departmentName: param.departmentName }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given name");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

    function getDepartmentByID() {
        Department.find({ departmentID: param.departmentID }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given ID");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }
})
router.get('/retrieve/staff', (req, res) => {
    console.log(req.query);
    const param = req.query;
    const info = JSON.stringify(param);
    const result = info.split("\"");
    console.log(result)
    switch (result[1]) {
        /**
         * staffID
         * basicdetails {
         * name
         * contact
         * address
         * qualification
         * }
         */
        case 'staffID': getStaffByID();
            break;
        case 'name': getStaffByName();
            break;
        case 'contact': getStaffByContact();
            break;
        case 'qualification': getStaffByQualification();
            break;
        case 'address': getStaffByAddress();
            break;
        default: break;
    }

    function getStaffByID() {
        Staff.find({ staffID: param.staffID }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given ID");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

    function getStaffByName() {
        Staff.find({ 'BasicDetails.name': param.name }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given Name");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

    function getStaffByContact() {
        Staff.find({ 'BasicDetails.contact': param.contact }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given contact");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

    function getStaffByQualification() {
        Staff.find({ 'BasicDetails.qualification': param.qualification }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given qualification");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }

    function getStaffByAddress() {
        Staff.find({ 'BasicDetails.address': param.address }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else if (!doc) {
                console.log("No data found");
                res.status(404).send("No data for given address");
            } else {
                console.log(doc);
                res.send(doc)
            }
        })
    }
})

module.exports = router;