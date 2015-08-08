'use strict';
/**
 * @file signed example
 * @module browser-language
 * @subpackage examples
 * @version 0.0.2
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var language = require('..'); // use require('browser-language') instead
var app = require('express')();
var cookie = require('cookie-parser');

// using middleware
app.use(cookie('foo')); // using only for parsing header cookie
app.use(language({
  cookie: 'new_cookie_name',
  signed: true
}));

// express routing
app.get('/', function(req, res) {

  res.send('hello world!');
}).listen(3000);// server starting
app.console.log('starting "hello world" on port 3000');
