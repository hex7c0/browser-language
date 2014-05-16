"use strict";
/**
 * example with express
 * 
 * @package browser-language
 * @subpackage lib
 * @version 0.0.1
 * @author hex7c0 <0x7c0@teboss.tk>
 * @license GPLv3
 */

/**
 * initialize module
 */
// import
try {
    var app = require('express')();
    var cookie = require('cookie-parser');
    var language = require('../index.js'); // use 'browser-language' instead
    app.use(cookie('pippo'));
} catch (MODULE_NOT_FOUND) {
    console.log(MODULE_NOT_FOUND);
    process.exit(1);
}

// using middleware
app.use(language({
    cookie : 'new_cookie_name'
}))

// express routing
app.get('/', function(req, res) {
    res.send('hello world!');
});

// server starting
app.listen(3000);
console.log('starting server on port 3000');
