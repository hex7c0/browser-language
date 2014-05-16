"use strict";
/**
 * browser-language
 * 
 * @package browser-language
 * @subpackage index
 * @version 1.0.1
 * @author hex7c0 <0x7c0@teboss.tk>
 * @license GPLv3
 * @overview main module
 * @copyright hex7c0 2014
 */

// global
var done = false;
var languageAll = {
    'ab' : 'Abkhazian',
    'af' : 'Afrikaans',
    'an' : 'Aragonese',
    'ar' : 'Arabic',
    'as' : 'Assamese',
    'az' : 'Azerbaijani',
    'be' : 'Belarusian',
    'bg' : 'Bulgarian',
    'bn' : 'Bengali',
    'bo' : 'Tibetan',
    'br' : 'Breton',
    'bs' : 'Bosnian',
    'ca' : 'Catalan',
    'ce' : 'Chechen',
    'co' : 'Corsican',
    'cs' : 'Czech',
    'cu' : 'Church',
    'cy' : 'Welsh',
    'da' : 'Danish',
    'de' : 'German',
    'el' : 'Greek',
    'en' : 'English',
    'eo' : 'Esperanto',
    'es' : 'Spanish',
    'et' : 'Estonian',
    'eu' : 'Basque',
    'fa' : 'Persian',
    'fi' : 'Finnish',
    'fj' : 'Fijian',
    'fo' : 'Faroese',
    'fr' : 'French',
    'fy' : 'Frisian',
    'ga' : 'Irish',
    'gd' : 'Gaelic',
    'gl' : 'Galician',
    'gv' : 'Manx',
    'he' : 'Hebrew',
    'hi' : 'Hindi',
    'hr' : 'Croatian',
    'ht' : 'Haitian',
    'hu' : 'Hungarian',
    'hy' : 'Armenian',
    'id' : 'Indonesian',
    'is' : 'Icelandic',
    'it' : 'Italian',
    'ja' : 'Japanese',
    'jv' : 'Javanese',
    'ka' : 'Georgian',
    'kg' : 'Kongo',
    'ko' : 'Korean',
    'ku' : 'Kurdish',
    'kw' : 'Cornish',
    'ky' : 'Kirghiz',
    'la' : 'Latin',
    'lb' : 'Luxembourgish',
    'li' : 'Limburgan',
    'ln' : 'Lingala',
    'lt' : 'Lithuanian',
    'lv' : 'Latvian',
    'mg' : 'Malagasy',
    'mk' : 'Macedonian',
    'mn' : 'Mongolian',
    'mo' : 'Moldavian',
    'ms' : 'Malay',
    'mt' : 'Maltese',
    'my' : 'Burmese',
    'nb' : 'Norwegian',
    'ne' : 'Nepali',
    'nl' : 'Dutch',
    'nn' : 'Norwegian',
    'no' : 'Norwegian',
    'oc' : 'Occitan',
    'pl' : 'Polish',
    'pt' : 'Portuguese',
    'rm' : 'Raeto-Romance',
    'ro' : 'Romanian',
    'ru' : 'Russian',
    'sc' : 'Sardinian',
    'se' : 'Sami',
    'sk' : 'Slovak',
    'sl' : 'Slovenian',
    'so' : 'Somali',
    'sq' : 'Albanian',
    'sr' : 'Serbian',
    'sv' : 'Swedish',
    'sw' : 'Swahili',
    'tk' : 'Turkmen',
    'tr' : 'Turkish',
    'ty' : 'Tahitian',
    'uk' : 'Ukrainian',
    'ur' : 'Urdu',
    'uz' : 'Uzbek',
    'vi' : 'Vietnamese',
    'vo' : 'Volapuk',
    'yi' : 'Yiddish',
    'zh' : 'Chinese'
};

function language(options) {
    /**
     * setting options
     * 
     * @param object options: various options. check README.md
     * @return function
     */

    var include = __dirname + '/lib/dictionary.js';
    var options = options || {};
    var LANG = options.dictionary || require(include).LANG;
    options.cookie = options.cookie || 'lang';
    options.age = parseInt(options.age) || 3600 * 1000 * 24 * 365;

    if (LANG._default == undefined) {
        // force
        LANG = require(include).LANG;
    } else if (!languageAll[LANG._default]) {
        console.error('language misconfigured');
        LANG = require(include).LANG;
    }
    process.env.LANG = LANG._default;

    return function detection(req, res, next) {
        /**
         * Detect language and (if accepted) build it. Store information on
         * cookie
         * 
         * @param object req: request
         * @param object res: response
         * @param object next: continue routes
         * @return function
         */

        if (req.cookies[options.cookie] == undefined) {
            // not already set
            if (res._headers == undefined) {
                // send only one cookie
                if (req.headers['accept-language']) {
                    // fix with benchmark script
                    var languagesTyp = req.headers['accept-language'].replace(
                            /q=[0-9.]*[,]?/g, '').split(';');

                    for (var i = 0; i < languagesTyp.length; i++) {
                        var language = languagesTyp[i].substring(0, 2);
                        if (LANG[language]) {
                            res.cookie(options.cookie, language, {
                                maxAge : options.age,
                            });
                            req.cookies[options.cookie] = language;
                            done = true;
                            break;
                        }
                    }
                }
            }
        } else if (LANG[req.cookies[options.cookie]]) {
            // check right cookie
            done = true;
        }

        if (done == false) {
            // reset
            res.cookie(options.cookie, LANG._default, {
                maxAge : options.age,
            });
            req.cookies[options.cookie] = LANG._default;
        }

        return next();
    };
};

/**
 * exports function
 */
exports = module.exports = language;
