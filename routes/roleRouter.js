const express = require('express');
const mongoose = require('mongoose');

const Roles = require('../models/roles');

const roleRouter = express.Router();

// /role endpoint
roleRouter.route('/')
.get((req, res) => {
    Roles.find(req.query)
	.then((roles) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(roles);
	})
	.catch((err) => {
        res.json(err);
    });
})
.post((req, res) => {
    Roles.create(req.body)
    .then((role) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(role);
    })
    .catch((err) => {
        res.json(err);
    })
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /role');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /role');
});

module.exports = roleRouter;