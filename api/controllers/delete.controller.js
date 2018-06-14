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

/**
 * Student records based on ID, basicDetails { name, contact, address}
 * Course records based on CourseID, courseName
 * Department records based on Department ID, department Name
 * marks records based on student ID , subject ID and both
 * staff records based on staff ID and basic details { name, contact, address}
 */

router.delete('/Delete/:param/', (req, res) => {
    const data = req.params;
    switch (data) {
        case 'student': deleteStudentRecord();
            break;
        case 'course': deleteCourseRecord();
            break;
        case 'department': deleteDepartmentRecord();
            break;
        case 'marks': deleteMarksRecord();
            break;
        case 'staff': deleteStaffRecord();
            break;
        default: break;
    }

    /**
     * Student deletion
     */
    function deleteStudentRecord() {
        const dataToDelete = req.query;
        const info = JSON.stringify(dataToDelete);
        const result = info.split("\"");
        console.log(result)
        switch (result[1]) {
            case 'ID': deleteStudentByID(dataToDelete.ID);
                break;
            case 'name': deleteStudentByName(dataToDelete.name);
                break;
            case 'contact': deleteStudentByContact(dataToDelete.contact);
                break;
            case 'address': deleteStudentbyAddress(dataToDelete.address);
                break;
            case 'departmentID': deleteStudentByDepartmentID(dataToDelete.departmentID);
                break;
            default: break;
        }
    }

    function deleteStudentByID(info) {
        Student.remove({ studentID: info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteStudentByName(info) {
        Student.remove({ 'basicDetails.name': info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteStudentByContact(info) {
        Student.remove({ 'basicDetails.contact': info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteStudentByAddress(info) {
        Student.remove({ 'basicDetails.address': info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteStudentByDepartmentID(info) {
        Student.remove({ departmentID: info }, (err, res) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }
    /**
     * Course deletion
     */
    function deleteCourseRecord() {
        const dataToDelete = req.query;
        const info = JSON.stringify(dataToDelete);
        const result = info.split("\"");
        console.log(result);
        switch (result[1]) {
            case 'ID': deleteCourseByID(dataToDelete.ID);
                break;
            case 'name': deleteCourseByName(dataToDelete.name);
                break;
            default: break;
        }
    }

    function deleteCourseID(info) {
        Course.remove({ courseID: info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteCourseByName(info) {
        Course.remove({ courseName: info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }
    /**
     * Department deletion
     */
    function deleteDepartmentRecord() {
        const dataToDelete = req.query;
        const info = JSON.stringify(dataToDelete);
        const result = info.split("\"");
        console.log(result)
        switch (result[1]) {
            case 'ID': deleteDepartmentByID(dataToDelete.ID);
                break;
            case 'name': deleteDepartmentByName(dataToDelete.name);
                break;
            default: break;
        }
    }

    function deleteDepartmentByID(info) {
        Department.remove({ departmentName: info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteDepartmentByName(info) {
        Department.remove({ departmentID: info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }
    /**
     * Marks deletion
     */
    function deleteMarksRecord() {
        const dataToDelete = req.query;
        const info = JSON.stringify(dataToDelete);
        const result = info.split("\"");
        console.log(result)
        switch (result[1]) {
            case 'studentID': deleteMarksByStudentID(dataToDelete.studentID);
                break;
            case 'subjectID': deleteMarksBySubjectID(dataToDelete.subjectID);
                break;
            default: if (dataToDelete.studentID && dataToDelete.subjectID) {
                deleteMarksRecord(dataToDelete.studentID, dataToDelete.subjectID);
            }
                break;
        }
    }

    function deleteMarksByStudentID(info) {
        Marks.remove({ studentID: info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteMarksBySubjectID(info) {
        Marks.remove({ subjectID: info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteMarksRecord(info1, info2) {
        Marks.remove({ studentID: info1, subjectID: info2 }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }
    /**
     * Staff deletion
     */
    function deleteStaffRecord() {
        const dataToDelete = req.query;
        const info = JSON.stringify(dataToDelete);
        const result = info.split("\"");
        console.log(result)
        switch (result[1]) {
            case 'ID': deleteStaffByID(dataToDelete.ID);
                break;
            case 'name': deleteStaffByName(dataToDelete.name);
                break;
            case 'contact': deleteStaffByContact(dataToDelete.contact);
                break;
            case 'address': deleteStaffByAddress(dataToDelete.address);
                break;
            default: break;
        }
    }

    function deleteStaffByID(info) {
        Staff.remove({ staffID: info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteStaffByName(info) {
        Staff.remove({ 'basicDetails.name': info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteStaffByContact(info) {
        Staff.remove({ 'basicDetails.contact': info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }

    function deleteStaffByAddress(info) {
        Staff.remove({ 'basicDetails.address': info }, (err, doc) => {
            if (err) {
                console.log("Something went wrong")
                res.status(400).send("Something went wrong");
            } else if (!doc) {
                console.log("No matching data found");
                res.status(404).send("No matching data found")
            } else {
                console.log(doc);
                res.send(doc);
            }
        })
    }
})


module.exports = router;