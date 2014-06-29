"use strict";
/**
 * @file browser-language main
 * @module browser-language
 * @package browser-language
 * @subpackage main
 * @version 1.0.9
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var my = null, LANG = null;
var all = {
    'ab': 'Abkhazian',
    'af': 'Afrikaans',
    'an': 'Aragonese',
    'ar': 'Arabic',
    'as': 'Assamese',
    'az': 'Azerbaijani',
    'be': 'Belarusian',
    'bg': 'Bulgarian',
    'bn': 'Bengali',
    'bo': 'Tibetan',
    'br': 'Breton',
    'bs': 'Bosnian',
    'ca': 'Catalan',
    'ce': 'Chechen',
    'co': 'Corsican',
    'cs': 'Czech',
    'cu': 'Church',
    'cy': 'Welsh',
    'da': 'Danish',
    'de': 'German',
    'el': 'Greek',
    'en': 'English',
    'eo': 'Esperanto',
    'es': 'Spanish',
    'et': 'Estonian',
    'eu': 'Basque',
    'fa': 'Persian',
    'fi': 'Finnish',
    'fj': 'Fijian',
    'fo': 'Faroese',
    'fr': 'French',
    'fy': 'Frisian',
    'ga': 'Irish',
    'gd': 'Gaelic',
    'gl': 'Galician',
    'gv': 'Manx',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'hr': 'Croatian',
    'ht': 'Haitian',
    'hu': 'Hungarian',
    'hy': 'Armenian',
    'id': 'Indonesian',
    'is': 'Icelandic',
    'it': 'Italian',
    'ja': 'Japanese',
    'jv': 'Javanese',
    'ka': 'Georgian',
    'kg': 'Kongo',
    'ko': 'Korean',
    'ku': 'Kurdish',
    'kw': 'Cornish',
    'ky': 'Kirghiz',
    'la': 'Latin',
    'lb': 'Luxembourgish',
    'li': 'Limburgan',
    'ln': 'Lingala',
    'lt': 'Lithuanian',
    'lv': 'Latvian',
    'mg': 'Malagasy',
    'mk': 'Macedonian',
    'mn': 'Mongolian',
    'mo': 'Moldavian',
    'ms': 'Malay',
    'mt': 'Maltese',
    'my': 'Burmese',
    'nb': 'Norwegian',
    'ne': 'Nepali',
    'nl': 'Dutch',
    'nn': 'Norwegian',
    'no': 'Norwegian',
    'oc': 'Occitan',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'rm': 'Raeto-Romance',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sc': 'Sardinian',
    'se': 'Sami',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'sq': 'Albanian',
    'sr': 'Serbian',
    'sv': 'Swedish',
    'sw': 'Swahili',
    'tk': 'Turkmen',
    'tr': 'Turkish',
    'ty': 'Tahitian',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'vo': 'Volapuk',
    'yi': 'Yiddish',
    'zh': 'Chinese'
};

/*
 * functions
 */
/**
 * set language to cookie
 * 
 * @function set
 * @param {Object} res - response to client
 * @param {Object} opt - my configuration
 * @param {String} lang - string for cookie
 * @param {Boolean} signed - if cookie'll be signed
 * @return {String}
 */
function set(res,opt,lang,signed) {

    res.cookie(opt.cookie,lang,{
        domain: opt.domain,
        path: opt.path,
        maxAge: opt.age,
        httpOnly: opt.httpOnly,
        secure: opt.secure,
        signed: signed,
    });
    return lang;
}
/**
 * detect language and (if accepted) build it. Store information on normal cookie
 * 
 * @function normal
 * @param {Object} req - client request
 * @param {Object} res - response to client
 * @param {next} next - continue routes
 * @return
 */
function normal(req,res,next) {

    var lang = LANG; // cache
    if (req.cookies == undefined) {
        req.cookies = {};
        /**
         * @todo req.headers.cookie
         */
    }
    if (req.cookies[my.cookie] == undefined) { // check
        if (req.headers['accept-language']) {
            // req.headers['accept-language'].replace(/q=[0-9.]*[,]?/g,'').split(';');
            var optional = req.headers['accept-language']
                    .match(/([a-zA-z]{2,2})/g);
            var language = optional.filter(function(elem,pos,self) {

                return self.indexOf(elem.toLowerCase()) == pos;
            })
            for (var i = 0, il = optional.length; i < il; i++) {
                if (lang[language[i]]) {
                    req.cookies[my.cookie] = set(res,my,language[i],false);
                    try {
                        return next();
                    } catch (TypeError) {
                        return;
                    }
                }
            }
        }
    } else if (lang[req.cookies[my.cookie]]) { // lookup
        try {
            return next();
        } catch (TypeError) {
            return;
        }
    }
    req.cookies[my.cookie] = set(res,my,lang._default,false);
    try {
        return next();
    } catch (TypeError) {
        return;
    }
}
/**
 * detect language and (if accepted) build it. Store information on signed cookie
 * 
 * @function signed
 * @param {Object} req - client request
 * @param {Object} res - response to client
 * @param {next} next - continue routes
 * @return
 */
function signed(req,res,next) {

    var lang = LANG; // cache
    if (req.signedCookies == undefined) {
        req.signedCookies = {};
        /**
         * @todo req.headers.cookie
         */
    }
    if (req.signedCookies[my.cookie] == undefined) { // check
        if (req.headers['accept-language']) {
            // req.headers['accept-language'].replace(/q=[0-9.]*[,]?/g,'').split(';');
            var optional = req.headers['accept-language']
                    .match(/([a-zA-z]{2,2})/g);
            var language = optional.filter(function(elem,pos,self) {

                return self.indexOf(elem.toLowerCase()) == pos;
            })
            for (var i = 0, il = optional.length; i < il; i++) {
                if (lang[language[i]]) {
                    req.signedCookies[my.cookie] = set(res,my,language[i],true);
                    try {
                        return next();
                    } catch (TypeError) {
                        return;
                    }
                }
            }
        }
    } else if (lang[req.signedCookies[my.cookie]]) { // lookup
        try {
            return next();
        } catch (TypeError) {
            return;
        }
    }
    req.signedCookies[my.cookie] = set(res,my,lang._default,true);
    try {
        return next();
    } catch (TypeError) {
        return;
    }
}
/**
 * setting options
 * 
 * @exports language
 * @function language
 * @param {Object} options - various options. Check README.md
 * @return {Function}
 */
module.exports = function language(options) {

    var include = __dirname + '/lib/dictionary.js';
    var options = options || {};
    var lang = options.dictionary || require(include).LANG;
    my = {
        cookie: String(options.cookie || 'lang'),
        domain: String(options.domain || ''),
        path: String(options.path || '/'),
        age: Number(options.age) || 1000 * 3600 * 24 * 365,
        httpOnly: Boolean(options.httpOnly),
        secure: Boolean(options.secure),
    }
    if (lang._default == undefined) {
        lang = require(include).LANG;
    } else if (!all[lang._default]) {
        console.error('language misconfigured');
        lang = require(include).LANG;
    }
    /**
     * @global
     */
    process.env.lang = lang._default;
    LANG = lang;
    if (Boolean(options.signed)) {
        normal = all = null;
        return signed;
    }
    signed = all = null;
    return normal;
};
