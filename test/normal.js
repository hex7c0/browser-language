"use strict";
/**
 * @file normal test
 * @module browser-language
 * @package browser-language
 * @subpackage test
 * @version 0.0.1
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
    var request = require('supertest');
    var assert = require('assert');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * test module
 */
describe('normal',function() {

    app.use(cookie('foo'));
    app.use(language({
        cookie: 'new_cookie_name',
    }));

    it('nothing - should return "en" cookie',function(done) {

        request(app).get('/').expect(200).end(function(err,res) {

            var s = 'new_cookie_name=en; Max-Age=31536000; Path=/;';
            var c = res.headers['set-cookie'][0].substring(0,s.length);
            assert.equal(s,c);
            done();
        });
    });

    it('invalid - should return "en" cookie',function(done) {

        request(app).get('/').set('Cookie',
                'new_cookie_name=XX; Max-Age=31536000; Path=/;').expect(200)
                .end(function(err,res) {

                    var s = 'new_cookie_name=en;';
                    var c = res.headers['set-cookie'][0].substring(0,s.length);
                    assert.equal(s,c);
                    done();
                });
    });

    it('ua - should return "it" cookie',function(done) {

        request(app).get('/').set('Accept-Language',
                'it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4').expect(200).end(
                function(err,res) {

                    var s = 'new_cookie_name=it; Max-Age=31536000; Path=/;';
                    var c = res.headers['set-cookie'][0].substring(0,s.length);
                    assert.equal(s,c);
                    done();
                });
    });

    it('cookie - should return nothing',function(done) {

        request(app).get('/').set('Cookie','new_cookie_name=de;').expect(200)
                .end(function(err,res) {

                    var c = res.headers['set-cookie'];
                    assert.equal(undefined,c);
                    done();
                });
    });

    it('all - should return nothing',function(done) {

        request(app).get('/').set('Accept-Language',
                'it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4').set('Cookie',
                'new_cookie_name=de;').expect(200).end(function(err,res) {

            var c = res.headers['set-cookie'];
            assert.equal(undefined,c);
            done();
        });
    });

});
