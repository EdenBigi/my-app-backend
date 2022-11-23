const express = require('express');
const router = express.Router();
const myrepository = require('../models/myRepository');

/*GET users listing. */
router.get('/new', function (req, res, next) {
    res.render('users/new', { user: new User() });
});

router.post("/", async (req, res) => {
    if (req.body) {
        const User = await myrepository.addNewUser(req.body);

        console.log("User Saved", User);
        res.redirect('/');
    }
    else {
        res.send("user already exists");
    }
});


module.exports = router;