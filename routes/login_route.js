const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const saltRounds = 10;
const accessToken = process.env.ACCESS_TOKEN_SECRET;

router.get('/list', async (req, res) => {    
    // Use Mongoose to find all users in the database
    const userList = await User.find().select('-_id username');

    if(!userList) {
        res.status(500).json({success: false})
    }

    res.send(userList)
});

router.get('/verify', authenticateKey, async (req, res) => {
    const users = await User.find();
    res.json(users.filter(user => user.username === req.username));
});

router.post('/auth', async (req, res) => {
    let {username, password} = req.body;

    const user = await User.findOne({username: username});
    const userToken = jwt.sign(user.username, accessToken);

    if (user == null) {
        return res.status(400).send("User not found");
    };

    try {
        bcrypt.compare(password, user.password, function(err, result) {
            if(result) {
                    res.status(200).json({
                    userToken: userToken,
                    success: result
                });
            } else {
                res.status(404).json({
                    err,
                    success: result
                });
            }
        });
    } catch {
        res.status(500).send
    }
});



function authenticateKey(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, accessToken, (err, username) => {
        if(err) return res.sendStatus(403);
        console.log(username);
        req.username = username;
        next()
    });
}

module.exports = router;