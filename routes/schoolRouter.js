const express = require('express');
const mongoose = require('mongoose');

const Schools = require('../models/schools');
const Students = require('../models/students');

const schoolRouter = express.Router();

// /role endpoint
schoolRouter.route('/')
.get((req, res) => {
    Schools.find(req.query)
	.then((schools) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(schools);
	})
	.catch((err) => {
        res.json(err);
    });
})
.post((req, res) => {

    Schools.create(req.body)
    .then((school) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(school);
    })
    .catch((err) => {
        res.json(err);
    })
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /school');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /school');
});

schoolRouter.route('/students')
.get((req, res) => {
    var data = [];
    Schools.find().distinct('_id', (err, ids) => {
        for(let i = 0; i < ids.length; i++) {
            Schools.findById({_id: ids[i]}, (err, school) => {
                if(school != null) {
                    Students.find({schoolId: school._id})
                    .then((stu) => {

                        var feed = {
                            _id: school._id,
                            name: school.name,
                            city: school.city,
                            state: school.state,
                            country: school.country,
                            createdAt: school.createdAt,
                            updatedAt: school.updatedAt,
                            students: stu
                        }
                        
                        data.push(feed);
                        if( i == ids.length - 1) {
                            res.statusCode = 200;
                            res.json(data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json(err);
                    })
                }
            })
        }
    });
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /school/students');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /school/students');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /school/students');
});

module.exports = schoolRouter;