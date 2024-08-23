const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv/config');

const saltRounds = 10;
const accessToken = process.env.ACCESS_TOKEN_SECRET;

router.post('/add', async (req, res) => {   
    let username = req.body.username;
    let rawPassword = req.body.password;
    
    bcrypt.hash(rawPassword, saltRounds, function(err, hashedPassword) {
        let newUser = new User({
            username: username,
            password: hashedPassword,
        })

        newUser.save().then((createdUser => {
            res.status(201).json({
                message: `the user ${createdUser.username} was created.`,
                success: true
            });
        })).catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false
            })
        });   
    });
});

module.exports = router;