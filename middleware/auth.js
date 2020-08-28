const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    /* Remarque
    What ever front-end frame work we're using it sends a token to the back-end
    él role de ce middleware est de récupérer le token éli ijina mél front-end framework
    */

    //1-We will fetch the token from the header
    const token = req.header('x-auth-token'); // ==>that's the header valuewe want to check for the token

    //2-check for the token
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    //status 401 means that you don't have the correct permessions (user in unauthorized)
    //the keyword return hiya éli bch exit mél fn or we will get errors 5ater the fn its trying to send twice

    try {
        //3-if there is a token then we need to verify it (our payload inside the JWT will be in this variable éli hiya él User ID)
        const decoded = jwt.verify(token, config.get('jwtSecret')); //this finction take the token and our secret string

        //4-We want to take the user from the token
        //we can take the user id from the token 5ater we set the id on the token payload
        //we want to put the user id in the req. variable ==> req.user (c le méme principe mapStateToProps)
        //from the token im going to get the user id and bind it to the req variable
        //======>>>>>> WHEN EVER THE TOKEN IS SENT WE HAVE THAT USER STORED IN THE REQ VALUE
        /* Remarque: we can set any req variables in our middleware functions (najmou nzidou des attr.s wéste él middleware func.s)*/
        req.user = decoded;

        //5-calling the next() func.
        next();

    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;