"use strict";
/**
 * example with express
 * 
 * @package browser-language
 * @subpackage example
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/**
 * initialize module
 */
// import
try {
    var language = require('../index.js'); // use 'browser-language' instead
    var app = require('express')();
} catch (MODULE_NOT_FOUND) {
    console.log(MODULE_NOT_FOUND);
    process.exit(1);
}

// using middleware
app.use(language({
    cookie: 'new_cookie_name',
}))

// express routing
app.get('/',function(req,res) {
    res.send('hello world!');
});
// server starting
app.listen(3000);
console.log('starting server on port 3000');
