const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//bringing the User model
const User = require('../../models/User');

//Making descreption for our routes

// @route POST api/users
// @desc  Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body; //deconstructring

    /* simple validation */

    if (!name || !email || !password) {
        //status 400 stands for a bad request it means that the user didn't send the correct
        //info to get the correct response
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for an exsisting user
    User.findOne({
        email
    })
        .then(user => {
            //we will send a 400 response there's already a user registered with that email
            if (user) return res.status(400).json({ msg: 'User already exists' });

            //here if the user dosen't exists in our DB
            const newUser = new User({
                name,
                email,
                password
            });

            //Create salt & hash
            //1- generating the salt
            bcrypt.genSalt(10, (err, salt) => {
                //2- generating the hash
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err; //checking if there is an error
                    //dans le cas éli jawna béhi
                    newUser.password = hash;

                    //saving the user into the DB
                    newUser.save()
                        .then(user => { //houni man7ébéche nraja3 él password ka raison de sécurité

                            // calling the jwt sign function
                            jwt.sign(
                                { id: user.id }, //7atite él user id so na3ref él token tébé3 anahou 3abd najém nésta3mlou in test later on
                                config.get('jwtSecret'), //a secret String that we use to make our token tnajém tkoune aye 7aja
                                { expiresIn: 3600 }, //ba3d se3a le token iétna7a
                                (err, token) => {
                                    //this is the callback func.
                                    if (err) throw err;
                                    
                                    //inside this callback we wanna put our response
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )


                            
                        })
                })
            })


        })
});



//NEVER EVER EVER FORRGET THIS LINE XD
module.exports = router;