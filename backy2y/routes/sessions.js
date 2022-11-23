const express = require("express")
const router = express.Router();
const myrepository = require('../models/myRepository');
const userModel = require('../models/user');
const User = userModel.User;


router.use('/', (req, res, next) => {
    req.isLoggedin = false;
    if (req.cookies && req.cookies.session) {
        req.isLoggedin = true;
    }

    next();

})

router.get('/hello', (req, res) => {
    if (req.isLoggedin) {
        res.send('Yaya login')
    }
    else {
        res.send('NOoo')
    }
})

router.get('/new', function (res, req, next) {
    res.render('sessions/new', { user: new User() });

})

router.post('/login', async (req, res, next) => {
    console.log("searching for username", req.body.email);


    let user = new User();
    try {
        let encryptedPass = await myrepository.checkUser(req.body.email);

        const res = await user.checkPassword(req.body.password, encryptedPass);



    }
    catch (err) {
        console.log("the error: ", err);
        return res.redirect(404, '/sessions/new');
    }
    req.session.userid = user.id;
    res.statusMessage = "UserSignedIn";
    res.redirect(210, '/');

})
const jwt = require('jsonwebtoken')

const jwtKey = 'my_secret_key'
//const jwtExpiryTimeInMilliseconds = 1000 * 60 * 15; //15 min
//const jwtExpiryTimeInSeconds =  1000 * 60 * 15; //15 min
const jwtExpiryTimeInSeconds = 10 * 1000; //10 sec


// our 'users db'
const users = {
    user1: 'password1',
    user2: 'password2',
    user3: 'password3',
    user4: 'password4',
    user5: 'password5'
}

// return true if the user exists in our db 
//     (else returns false)
function myCheckUserPasswordService(uname, pass) {
    if (!uname || !pass || (users[uname] !== pass)) {
        return false;
    }
    else {
        return true
    }
}
//--------------------------
const signIn = (req, res) => {
    console.log("sign in");
    const { username, password } = req.body;
    const isPassOK = myCheckUserPasswordService(username, password);
    if (!isPassOK) {
        return res.status(401).end();
    }
    // Create a new token with the username in the payload
    //   which expires after X seconds/minutes
    let X = jwtExpiryTimeInSeconds;
    const token = jwt.sign({ username, "david": "is awesome" }, jwtKey, { algorithm: 'HS256', expiresIn: X })
    console.log("sign in, created token: ", token);

    res.cookie('token', token, { maxAge: X });
    res.json({ "token was set": "yes" });
}
//--------------------------
const refresh = (req, res) => {
    let myStatusCode = 200
    const token = req.cookies.token;

    if (!token) {
        console.log('refresh - couldnt find "token" in the cookies');
        myStatusCode = 401;
        return myStatusCode;
    }

    let payload;
    try {
        // lets call our library's function "verify"
        //    to check for us if the token is "good"
        //      if it is "good" the function returns the text that
        //        is inside that "token"
        payload = jwt.verify(token, jwtKey)
    }
    catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            myStatusCode = 401;
            return myStatusCode;
        }
        myStatusCode = 400;
        return myStatusCode;
    }

    // once we got here it means the user derves a new token
    // now lets refresh
    let X = jwtExpiryTimeInSeconds;
    const newToken = jwt.sign({ username: "me" }, jwtKey, { algorithm: 'HS256', expiresIn: X })
    console.log("sign in, created token: ", token);

    res.cookie('token', newToken, { maxAge: X });
    res.thePayload = payload;

    // it should still be 200 if we got here
    return myStatusCode;
}
//--------------------------




const secretPage = (req, res) => {
    console.log("---------- secretPage ---------");
    console.log("myStatusCode = " + res.myStatusCode);
    if (res.myStatusCode === 200) {
        res.send(`Secret page for: ${res.thePayload.username}`)
    }
    else {
        res.status(res.myStatusCode).send("no data");
    }
}


module.exports = {
    secretPage,
    refresh,
    signIn
}



module.exports = router;