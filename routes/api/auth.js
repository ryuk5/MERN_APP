const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//importing the auth middleware
const auth = require('../../middleware/auth');

//bringing the User model
const User = require('../../models/User');

//Making descreption for our routes

// @route POST api/auth
// @desc  Auth the user
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body; //deconstructring

    /* simple validation */

    if (!email || !password) {
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
            if (!user) return res.status(400).json({ msg: 'User Does not exists' });

            //1- Validating the password
            //this function returns a promise
            bcrypt.compare(password, user.password) //password is the plain text pwd // the user.passwod is the hashed pwd
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' }) //status 400 5ater user 3te infos 8atine wrong data from the user

                    //Here we have correct login so in that case we send the token and the user
                    jwt.sign(
                        { id: user.id }, //we are passing the user ID as a payload (payload === data that we are going to use usefull data)
                        config.get('jwtSecret'), //a secret String that we use to make our token tnajém tkoune aye 7aja
                        { expiresIn: 3600 }, //ba3d se3a le token iétna7a
                        (err, token) => {
                            //this is the callback func.
                            if (err) throw err;

                            //inside this callback we wanna put our response (token + user)
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
});

/* IMPORTANT TO GET CONSTANTLY THE USER DATA */

//él but de cette fonction éni constantly get the user data 
//(5ater fél JWT mafaméche sessions lézém dima ikounou 3andi él user data)
//Remarique: We're in the auth file so we just have to do /user 5ater le faite 
//ke a7na in this file déja él /api/auth mawjouda

// @route GET api/auth/user
// @desc  Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id) //here i need to pass the id of the current user éli éna déja bind it 
        .select('-password')   //id bté3ou fél req object (arja3 lél auth middleware "req.user = decoded;")
        .then(user => res.json(user));
});

/* that's it so that will validate the user with the token */

//NEVER EVER EVER FORRGET THIS LINE XD
module.exports = router;