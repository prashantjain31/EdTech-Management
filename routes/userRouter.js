const express = require('express');
const mongoose = require('mongoose');

const Users = require('../models/users');
const Roles = require('../models/roles');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var config = require('../config');

const userRouter = express.Router();

// /user endpoint
userRouter.route('/')
.get((req, res) => {
    Users.find(req.query)
	.then((users) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(users);
	})
	.catch((err) => {
        res.json(err);
    });
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /user');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /user');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /user');
});


// /user/signup endpoint
userRouter.route('/signup')
.get((req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /signup');
})
.post((req, res) => {

    if(req.body.roleId != null) {
        Roles.findById(req.body.roleId)
        .then((role) => {

            if(role != null) {
                bcrypt.hash(req.body.password,10)
                .then(hashedPassword => {
                    const user = new Users({
                        name: req.body.name,
                        email: req.body.email,
                        roleId: req.body.roleId,
                        password: hashedPassword
                    })

                    Users.create(user)
                    .then((user) => {
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 200;
                        res.json(user);
                    })
                    .catch((err) => {
                        res.json(err);
                    })
                })
            }
            else {
                res.statusCode = 500;
                res.json({
                    message: "Not a valid RoleId"
                })
            }
        })
        .catch((err) => {
            res.statusCode = 500;
            res.json(err);
        })
    }
    else if (req.body.roleId == null) {

        bcrypt.hash(req.body.password,10)
        .then(hashedPassword => {
            const user = new Users({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })

            Users.create(user)
            .then((user) => {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.json(user);
            })
            .catch((err) => {
                res.json(err);
            })
        })       
    }
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /signup');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /signup');
});


// /user/signin endpoint
userRouter.route('/signin')
.get((req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /signin');
})
.post((req, res) => {

    var data = {
        email: req.body.email
    };

    Users.findOne(data, (err, user) => {
        if(user != null) {
            
            bcrypt.compare(req.body.password, user.password)
            .then((doMatch) => {
                if(!doMatch) {
                    res.statusCode = 422;
                    res.json({ error: "Invalid email or password" });
                } else {
                    const token = jwt.sign({ _id: user.id }, config.secretKey);
                    const { _id, name, email, roleId, createdAt, updatedAt } = user;
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        data: {
                            _id,
                            name,
                            email,
                            roleId,
                            createdAt,
                            updatedAt
                        },
                        token,
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ error: "Could not sign in" });
            })
        }
        else {
            res.json(err);
        }
    })

})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /signin');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /signin');
});

// /user/id endpoint
userRouter.route('/:userId')
.get((req, res) => {
    Users.findById(req.params.userId)
	.then((user) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(user);
	})
	.catch((err) => {
        res.json(err);
    });
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /user/' + req.params.userId);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /user/' + req.params.userId);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /user/' + req.params.userId);
});

module.exports = userRouter;