
const express = require('express')
const path = require('path')
const app = express();
const connect = require('./models/myDbConnect');
const cors = require('cors');
const cookieSession = require('cookie-session');
const sessionsRouter = require('./routes/sessions');
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(cookieSession({
    secret: "biga",
    maxAge: 18 * 1000,

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use('/api/items', require('./routes/items'));
app.use('/api/users', require('./routes/users'));
app.use('/sessions', sessionsRouter);


//----------------------------------
const port = process.env.PORT || 5051;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});



