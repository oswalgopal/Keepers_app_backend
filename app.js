const express = require('express');
const morgan = require('morgan'); /** for logging the request into the terminal */
const bodyParser = require('body-parser'); /** for parsing the data we imported body parser */
/**
 * importing all the routes
 */
const loginRoute = require('./api/routes/login');


const app = express(); /**created an app of express */
app.use(morgan('dev')); /** using morgan in our app */
app.use(bodyParser.urlencoded({ extended: false })); /** using body parser with extended false means parse only simple data */

/**
 * enabling CORS
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.methods === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

/** 
 * using login route and handling it with login Route
 */
app.use('/login', loginRoute);

/**
 * handling the invalid url error
 */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

/**
 * error handler function
 */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
    });
});

/** exporting our app to the index,js */
module.exports = app;