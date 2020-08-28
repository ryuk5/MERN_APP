const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config'); //importing the config mkg

//This package will allow us totake requests and get data from the body
//when we send a post request we want to be able to get the name
//of that post from the request 
//const bodyParser = require('body-parser'); //the latest version of express feha body parser
//const { json } = require('body-parser');

//importing the file which will handle items routing
const items = require('./routes/api/items');
const { patch } = require('./routes/api/items');

//importing the file which will handle users routing
const users = require('./routes/api/users');

//importing the file that handles the auth routing
const auth = require('./routes/api/auth');

//initialize express into a variable called app
const app = express();

//BodyParser has a piece of middleware that we need to add 
//(kont nésta3méll fi él pkg body parser but since express wallé fih body parser par défaut bch nesta3méll express)
//app.use(bodyParser.json());
app.use(express.json()); //the new express body parser

//We need a MongoDB URI
//importing the URI from the config/keys.js
const db = config.get('mongoURI'); //We just bringing in the Mongo URI

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) //this is a promise base
    .then(() => {
        console.log("Connected Successfully to MongoDB");
    })
    .catch(err => {
        console.error(err);
    })

// Use Routes aye request that goes for 
// api/items/* le fichier routes/api/index.js va la traiter
//au lieu mén éna every route néktbouh houni , dou on a assurer la modularité
app.use('/api/items', items); // this ligne means that aye request temchi lél /api/items should refer the items variable éli hiya our file that we required

app.use('/api/users', users);
app.use('/api/auth', auth);

/* Modification éli bch tsir if we are in production */
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //1-set static folder (houni él serveur bch yar9a our front end app compiled)
    app.use(express.static('client/build'));

    //2-aye path bch ijina bch nraj3oulou this page which is our single page
    app.get('*', (req, res) => {
        res.sendFile(patch.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
/* ---------------------End Modifications------------------------------ */

//We need to be able to run our server so we will create a variablefor the port that 
//we gonna use
//we can deploy our to Heroku so we gotta use the env variable
const port = process.env.PORT || 5000;

//Our server start listening
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})