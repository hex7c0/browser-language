'use strict';
/**
 * @file normal example
 * @module browser-language
 * @package browser-language
 * @subpackage examples
 * @version 0.0.2
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var language = require('../index.min.js'); // use require('browser-language') instead
    var app = require('express')();
    var cookie = require('cookie-parser');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

// using middleware
app.use(cookie('foo')); // using only for parsing header cookie
app.use(language({
    cookie: 'new_cookie_name',
}));

// express routing
app.get('/',function(req,res) {

    res.send('hello world!');
});
// server starting
app.listen(3000);
console.log('starting "hello world" on port 3000');
