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


router.get('/allStudents', (req, res) => {
    Student.find({}, (err, results) => {
        if (err || !results) {
            console.log('Error or no results', err);
            res.status(404).send("No Data");
        } else {
            console.log(results);
            res.send(results)
        }
    })
})




router.post('/insert', (req, res) => {
    const allStudents = new Array();
    const allCourses = new Array();
    const allDepartment = new Array();
    const allMarks = new Array();
    const allStaff = new Array();
    const Result = new Array();
    let errStatus;
    const allPromise = new Array();
    const body = req.body;
    const students = body.students, courses = body.course, departments = body.departments, marks = body.marks, staffs = body.staff;

    const promiseStudent = new Promise(function (resolve, reject) {
        if (students) {
            students.forEach((student) => {
                if (student && student.studentID) {
                    allStudents.push(student);
                    updateStudent(student);
                } else {
                    errStatus = "error";
                }
            });
            resolve();
        } else {
            reject("no values in student object")
        }
    });

    const promiseCourse = new Promise(function (resolve, reject) {
        if (courses) {
            courses.forEach((course) => {
                if (course && course.courseID) {
                    allCourses.push(course);
                    updateCourse(course);
                } else {
                    errStatus = "error";
                }
            });
            resolve();
        } else {
            reject("no values in course object")
        }
    });

    const promiseDepartment = new Promise(function (resolve, reject) {
        if (departments) {
            departments.forEach((department) => {
                if (department) {
                    allDepartment.push(department)
                    updateDept(department);
                } else {
                    errStatus = "error";
                }
            });
            resolve();
        } else {
            reject("No values in the department Object");
        }
    });

    const promiseMarks = new Promise(function (resolve, reject) {
        if (marks) {
            marks.forEach((mark) => {
                if (mark) {
                    allMarks.push(mark)
                    updateMarks(mark);
                } else {
                    errStatus = "error"
                }
            })
            resolve();
        } else {
            reject("No values in the marks Object")
        }
    })

    const promiseStaff = new Promise(function (resolve, reject) {
        if (staffs) {
            staffs.forEach((staff) => {
                if (staff) {
                    allStaff.push(staff);
                    updateStaff(staff);
                } else {
                    errStatus = "error"
                }
            })
            resolve();
        } else {
            reject("No values in the staff object")
        }
    })

    function updateStudent(student) {
        Student.findOneAndUpdate({ studentID: student.studentID }, { $set: student }, { new: true }, function (err, doc) {
            if (err || !doc) {
                new Student(student).save();
                console.log("student saved")
            } else
                console.log("student updated");
        });
    }

    function updateCourse(course) {
        Course.findOneAndUpdate({ courseID: course.courseID }, { $set: course }, { new: true }, function (err, doc) {
            if (err || !doc) {
                new Course(course).save();
                console.log("course saved")
            } else {
                console.log("course updated")
            }
        });
    }

    function updateDept(department) {
        Department.findOneAndUpdate({ departmentID: department.departmentID }, { $set: department }, { new: true }, function (err, doc) {
            if (err || !doc) {
                new Department(department).save();
                console.log("Department Saved")
            } else {
                console.log("Department Updated")
            }
        });
    }

    function updateMarks(marks) {
        Marks.findOneAndUpdate({ studentID: marks.studentID, subjectID: marks.subjectID }, { $set: marks }, { new: true }, function (err, doc) {
            if (err || !doc) {
                new Marks(marks).save();
                console.log("Marks data saved")
            } else {
                console.log("Marks Updated")
            }
        })
    }

    function updateStaff(staff) {
        Staff.findOneAndUpdate({ staffID: staff.staffID }, { $set: staff }, { new: true }, function (err, doc) {
            if (err || !doc) {
                new Staff(staff).save();
                console.log("Staff saved")
            } else {
                console.log("staff updated")
            }
        })
    }


    allPromise.push(promiseStudent);
    allPromise.push(promiseCourse);
    allPromise.push(promiseDepartment);
    allPromise.push(promiseMarks);
    allPromise.push(promiseStaff);
    
    Promise.all([allPromise]).then(function () {
        if (errStatus === "error") {
            console.log(errStatus);
            res.status(400).send("error");
        } else {
            if (allStudents) {
                Result.push(allStudents);
            }
            if (allCourses) {
                Result.push(allCourses)
            }
            if (allDepartment) {
                Result.push(allDepartment)
            }
            if (allMarks) {
                Result.push(allMarks);
            }
            if (allStaff) {
                Result.push(allStaff)
            }
            res.send(Result)
        }

    });

});
module.exports = router;