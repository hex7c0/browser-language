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

app.use(cookie('foo')); // using for parsing header cookie

app.use(language({
  cookie: 'new_encrypt_cookie_name', // set name of cookie
  encryptionSecret: 'ciao', // encrypt cookie with this secret
})).get('/', function(req, res) {

  res.send('hello world!');
}).listen(3000);// server starting
console.log('starting "hello world" on port 3000');
