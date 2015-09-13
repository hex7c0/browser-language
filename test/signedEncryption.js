'use strict';
/**
 * @file signedEncryption test
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
describe(
  'signedEncryption',
  function() {

    describe(
      'encryptionSecret as Array',
      function() {

        var app = express();
        before(function(done) {

          app.use(cookie('foo')).use(language({
            cookie: 'new_cookie_name',
            signed: true,
            encryptionSecret: [ 'ciao' ]
          })).get('/', function(req, res) {

            res.send('hello world!');
          });
          done();
        });

        it(
          'nothing - should return "en" cookie as plaintext',
          function(done) {

            request(app)
                .get('/')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3Aen.KutCmPwty7I2UokWkAtt6hfgeXkPi0MXVdrIr8mMMMY; Max-Age=31536000; Path=/;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });
      });

    describe(
      'encryptionSecret as Object',
      function() {

        var app = express();
        before(function(done) {

          app.use(cookie('foo')).use(language({
            cookie: 'new_cookie_name',
            signed: true,
            encryptionSecret: {
              c: 'ciao'
            }
          })).get('/', function(req, res) {

            res.send('hello world!');
          });
          done();
        });

        it(
          'nothing - should return "en" cookie as plaintext',
          function(done) {

            request(app)
                .get('/')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3Aen.KutCmPwty7I2UokWkAtt6hfgeXkPi0MXVdrIr8mMMMY; Max-Age=31536000; Path=/;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });
      });

    describe(
      'encryptionSecret as Undefined',
      function() {

        var app = express();
        before(function(done) {

          app.use(cookie('foo')).use(language({
            cookie: 'new_cookie_name',
            signed: true
          })).get('/', function(req, res) {

            res.send('hello world!');
          });
          done();
        });

        it(
          'nothing - should return "en" cookie as plaintext',
          function(done) {

            request(app)
                .get('/')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3Aen.KutCmPwty7I2UokWkAtt6hfgeXkPi0MXVdrIr8mMMMY; Max-Age=31536000; Path=/;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });
      });

    describe(
      'default',
      function() {

        var app = express();

        before(function(done) {

          app.use(cookie('foo')).use(language({
            cookie: 'new_cookie_name',
            signed: true,
            encryptionSecret: 'ciao'
          })).get('/', function(req, res) {

            res.send('hello world!');
          });
          done();
        });

        it(
          'nothing - should return "en" cookie',
          function(done) {

            request(app)
                .get('/')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3A36b0.SvymOY29hhnB9kafWl%2BB5UT03xi4ta1t%2BI5232rB3n4; Max-Age=31536000; Path=/;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });
        it(
          'invalid - should return "en" cookie',
          function(done) {

            request(app)
                .get('/')
                .set('Cookie', 'new_cookie_name=XX; Max-Age=31536000; Path=/;')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3A36b0.SvymOY29hhnB9kafWl%2BB5UT03xi4ta1t%2BI5232rB3n4;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });
        it(
          'ua - should return "it" cookie',
          function(done) {

            request(app)
                .get('/')
                .set('Accept-Language', 'it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3A3aaa.zQ%2BAqh%2FIheSBUd2zo28sVtE4L%2FxtAcfmBWFKMfhJZb0; Max-Age=31536000; Path=/;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });

        describe('decrypt fail', function() {

          it('cookie - should return nothing', function(done) {

            request(app).get('/').set('Cookie', 'new_cookie_name=de;').expect(
              200).end(function(err, res) {

              var c = res.headers['set-cookie'];
              assert.notEqual(undefined, c);
              done();
            });
          });
          it('all - should return nothing', function(done) {

            request(app).get('/').set('Accept-Language',
              'it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4').set('Cookie',
              'new_cookie_name=de;').expect(200).end(function(err, res) {

              var c = res.headers['set-cookie'];
              assert.notEqual(undefined, c);
              done();
            });
          });
        });

        describe(
          'decrypt',
          function() {

            it(
              'cookie - should return nothing',
              function(done) {

                request(app)
                    .get('/')
                    .set('Cookie',
                      'new_cookie_name=s%3A3aaa.zQ%2BAqh%2FIheSBUd2zo28sVtE4L%2FxtAcfmBWFKMfhJZb0;')
                    .expect(200).end(function(err, res) {

                      var c = res.headers['set-cookie'];
                      assert.equal(undefined, c);
                      done();
                    });
              });
            it(
              'all - should return nothing',
              function(done) {

                request(app)
                    .get('/')
                    .set('Accept-Language',
                      'it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4')
                    .set('Cookie',
                      'new_cookie_name=s%3A3aaa.zQ%2BAqh%2FIheSBUd2zo28sVtE4L%2FxtAcfmBWFKMfhJZb0;')
                    .expect(200).end(function(err, res) {

                      var c = res.headers['set-cookie'];
                      assert.equal(undefined, c);
                      done();
                    });
              });
          });
      });

    describe(
      'aes128 base64',
      function() {

        var app = express();

        before(function(done) {

          app.use(cookie('foo')).use(language({
            cookie: 'new_cookie_name',
            signed: true,
            encryptionSecret: 'ciao',
            encryptionOptions: {
              cipher: 'aes128',
              encoding: 'base64'
            }
          })).get('/', function(req, res) {

            res.send('hello world!');
          });
          done();
        });

        it(
          'nothing - should return "en" cookie',
          function(done) {

            request(app)
                .get('/')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3AUnqTPg%2BmhdLnyVJp3WLHog%3D%3D.gYO4%2FxUlQ8zE8PaJXIO6I8euUedYzZKHZ3aT2UecJGw; Max-Age=31536000; Path=/;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });
        it(
          'invalid - should return "en" cookie',
          function(done) {

            request(app)
                .get('/')
                .set('Cookie', 'new_cookie_name=XX; Max-Age=31536000; Path=/;')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3AUnqTPg%2BmhdLnyVJp3WLHog%3D%3D.gYO4%2FxUlQ8zE8PaJXIO6I8euUedYzZKHZ3aT2UecJGw;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });
        it(
          'ua - should return "it" cookie',
          function(done) {

            request(app)
                .get('/')
                .set('Accept-Language', 'it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4')
                .expect(200)
                .end(
                  function(err, res) {

                    var s = 'new_cookie_name=s%3AE2aZCkn%2BVtOl6EJ4iwINIA%3D%3D.hGdXHACaohVeon1Q0onZIrJxLhEcz6hadnIhiM4jYQc; Max-Age=31536000; Path=/;';
                    var c = res.headers['set-cookie'][0].substring(0, s.length);
                    assert.equal(s, c);
                    done();
                  });
          });

        describe('decrypt fail', function() {

          it('cookie - should return nothing', function(done) {

            request(app).get('/').set('Cookie', 'new_cookie_name=de;').expect(
              200).end(function(err, res) {

              var c = res.headers['set-cookie'];
              assert.notEqual(undefined, c);
              done();
            });
          });
          it('all - should return nothing', function(done) {

            request(app).get('/').set('Accept-Language',
              'it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4').set('Cookie',
              'new_cookie_name=de;').expect(200).end(function(err, res) {

              var c = res.headers['set-cookie'];
              assert.notEqual(undefined, c);
              done();
            });
          });
        });

        describe(
          'decrypt',
          function() {

            it(
              'cookie - should return nothing',
              function(done) {

                request(app)
                    .get('/')
                    .set(
                      'Cookie',
                      'new_cookie_name=s%3AE2aZCkn%2BVtOl6EJ4iwINIA%3D%3D.hGdXHACaohVeon1Q0onZIrJxLhEcz6hadnIhiM4jYQc;')
                    .expect(200).end(function(err, res) {

                      var c = res.headers['set-cookie'];
                      assert.equal(undefined, c);
                      done();
                    });
              });
            it(
              'all - should return nothing',
              function(done) {

                request(app)
                    .get('/')
                    .set('Accept-Language',
                      'it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4')
                    .set(
                      'Cookie',
                      'new_cookie_name=s%3AE2aZCkn%2BVtOl6EJ4iwINIA%3D%3D.hGdXHACaohVeon1Q0onZIrJxLhEcz6hadnIhiM4jYQc;')
                    .expect(200).end(function(err, res) {

                      var c = res.headers['set-cookie'];
                      assert.equal(undefined, c);
                      done();
                    });
              });
          });
      });
  });
