const express = require('express');
const mongoose = require('mongoose');

const Students = require('../models/students');
const Users = require('../models/users');
const Schools = require('../models/schools');

const studentRouter = express.Router();

// /role endpoint
studentRouter.route('/')
.get((req, res) => {
    Students.find(req.query)
	.then((students) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(students);
	})
	.catch((err) => {
        res.json(err);
    });
})
.post((req, res) => {

    var userId = req.body.userId;
    var schoolId = req.body.schoolId;

    if(!userId || !schoolId) {
        res.json({
            message: "Please Provide userId and schoolId"
        })
    }

    Users.findById(userId)
    .then((user) => {
        if(user !== null) {
            Schools.findById(schoolId)
            .then((school) => {
                if(school !== null) {
                    Students.create(req.body)
                    .then((student) => {
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 200;
                        res.json(student);
                    })
                    .catch((err) => {
                        res.json(err);
                    })
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        message: "Wrong SchoolId"
                    })
                }
            })
            .catch((err) => {
                res.json({
                    message: "Wrong SchoolId!"
                });
            })
        }
        else if(user == null) {
            res.statusCode = 500;
            res.json({
                message: "Wrong UserId"
            });
        }
    })
    .catch((err) => {
        res.json({
            message: "Wrong UserId!"
        });
    })

})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /student');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /student');
});

module.exports = studentRouter;