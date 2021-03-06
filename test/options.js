'use strict';
/**
 * @file options test
 * @module browser-language
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var language = require('..');
var express = require('express');
var cookie = require('cookie-parser');
var request = require('supertest');
var assert = require('assert');

/*
 * test module
 */
describe('options', function() {

  it('domain - should return "en" cookie for domain', function(done) {

    var app = express();
    app.use(cookie('foo')).use(language({
      cookie: 'hello',
      domain: 'hello.com',
      path: '/admin'
    }));
    request(app).get('/').expect(200).end(function(err, res) {

      var s = 'hello=en; Max-Age=31536000; Domain=hello.com; Path=/admin;';
      var c = res.headers['set-cookie'][0].substring(0, s.length);
      assert.equal(s, c);
      done();
    });
  });
  it('day - should return "en" cookie for 1 day', function(done) {

    var day = 3600 * 1000;
    var app = express();
    app.use(cookie('foo')).use(language({
      cookie: 'new_cookie_name',
      maxAge: day
    }));
    request(app).get('/').expect(200).end(function(err, res) {

      var s = 'new_cookie_name=en; Max-Age=3600; Path=/;';
      var c = res.headers['set-cookie'][0].substring(0, s.length);
      assert.equal(s, c);
      done();
    });
  });
  it('httpOnly - should return "en" cookie for httpOnly', function(done) {

    var app = express();
    app.use(cookie('foo')).use(language({
      cookie: 'new_cookie_name',
      httpOnly: true
    }));
    request(app).get('/').expect(200).end(function(err, res) {

      var s = 'HttpOnly';
      var c = res.headers['set-cookie'][0].match('HttpOnly')[0];
      assert.equal(s, c);
      done();
    });
  });
  it('secure - should return "en" cookie for secure', function(done) {

    var app = express();
    app.use(cookie('foo')).use(language({
      cookie: 'new_cookie_name',
      secure: true
    }));
    request(app).get('/').expect(200).end(function(err, res) {

      var s = 'Secure';
      var c = res.headers['set-cookie'][0].match('Secure')[0];
      assert.equal(s, c);
      done();
    });
  });
});
