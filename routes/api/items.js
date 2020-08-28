const express = require('express');
const router = express.Router();

//including our personal middleware
//1-require our middleware
const auth = require('../../middleware/auth'); //it's my middleware

//bringing the Item model
const Item = require('../../models/Item');

//Making descreption for our routes

// @route GET api/items
// @desc  Get All Items
// @access Public
router.get('/', (req, res) =>{
    Item
    .find()
    .sort({
        date: -1
    })
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        console.error(err);
    })
});

// @route POST api/items
// @desc  Create A Item
// @access Private (normally it should be private if we implemented authentification)
router.post('/', auth, (req, res) =>{
    const newItem = new Item({
        name: req.body.name
    });

    newItem
    .save()
    .then(item =>{
        res.json(item);
    })
    .catch(err =>{
        res.status(500).json({success: false});
    })
});

// @route DELETE api/items/:id (this route needs id to know what item to delete this syntax kiféh t3adi id in URL)
// @desc  Delete A Item
// @access Private (normally it should be private if we implemented authentification)
router.delete('/:id', auth, (req, res) =>{
    Item
    .findById(req.params.id) //This is the way to access the params in the URL
    .then(item =>{
        item
        .remove()
        .then(() => res.json({success: true}))
        .catch(err => console.error(err))
    })
    .catch(err => res.status(404).json({success: false}))
});


//NEVER EVER EVER FORRGET THIS LINE XD
module.exports = router;