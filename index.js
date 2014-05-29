"use strict";
/**
 * @file browser-language main
 * @module browser-language
 * @version 1.0.3
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

// variables
/**
 * @global
 */
var my = {}, LANG = {}, languageAll = {
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

/**
 * set language to cookie
 * 
 * @function normal
 * @param {Object} res - response to client
 * @param {String} lang - string for cookie
 * @param {Boolean} signed - if cookie'll be signed
 * @return
 */
function set(res,lang,signed) {

    res.cookie(my.cookie,lang,{
        domain: my.domain,
        path: my.path,
        maxAge: my.age,
        httpOnly: my.httpOnly,
        secure: my.secure,
        signed: signed,
    });
    return;

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

    var done = false;
    if (req.cookies == undefined) {
        req.cookies = {};
    }
    if (req.cookies[my.cookie] == undefined) {
        // send only one cookie
        if (req.headers['accept-language']) {
            // fix with benchmark script
            var languagesTyp = req.headers['accept-language'].replace(/q=[0-9.]*[,]?/g,'').split(
                    ';');
            for (var i = 0, il = languagesTyp.length; i < il; i++) {
                var language = languagesTyp[i].substring(0,2);
                if (LANG[language]) {
                    set(res,language,false);
                    req.cookies[my.cookie] = language;
                    done = true;
                    break;
                }
            }
        }
    } else if (LANG[req.cookies[my.cookie]]) {
        // check right cookie
        done = true;
    }

    if (done == false) {
        // reset
        set(res,LANG._default,false);
        req.cookies[my.cookie] = LANG._default;
    }
    return next();

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

    var done = false;
    if (req.signedCookies == undefined) {
        req.signedCookies = {};
    }
    if (req.signedCookies[my.cookie] == undefined) {
        // send only one cookie
        if (req.headers['accept-language']) {
            // fix with benchmark script
            var languagesTyp = req.headers['accept-language'].replace(/q=[0-9.]*[,]?/g,'').split(
                    ';');
            for (var i = 0, il = languagesTyp.length; i < il; i++) {
                var language = languagesTyp[i].substring(0,2);
                if (LANG[language]) {
                    set(res,language,true);
                    req.signedCookies[my.cookie] = language;
                    done = true;
                    break;
                }
            }
        }
    } else if (LANG[req.signedCookies[my.cookie]]) {
        // check right cookie
        done = true;
    }

    if (done == false) {
        // reset
        set(res,LANG._default,true);
        req.signedCookies[my.cookie] = LANG._default;
    }
    return next();

}
/**
 * setting options
 * 
 * @function language
 * @param {Object} options: various options. check README.md
 * @return {function}
 */
function language(options) {

    var include = __dirname + '/lib/dictionary.js';
    var options = options || {};
    var lang = options.dictionary || require(include).LANG;
    my = {
        cookie: String(options.cookie || 'lang'),
        domain: options.domain || null,
        path: String(options.path || '/'),
        age: parseInt(options.age) || 1000 * 3600 * 24 * 365,
        httpOnly: Boolean(options.httpOnly),
        secure: Boolean(options.secure),
    }
    if (lang._default == undefined) {
        // force
        lang = require(include).LANG;
    } else if (!languageAll[lang._default]) {
        console.error('language misconfigured');
        lang = require(include).LANG;
    }
    process.env.lang = lang._default;
    LANG = lang;

    if (Boolean(options.signed)) {
        // remove obsolete
        normal = languageAll = null;
        return signed;
    } else {
        // remove obsolete
        signed = languageAll = null;
        return normal;
    }

};

/**
 * exports function
 * 
 * @exports language
 */
module.exports = language;
