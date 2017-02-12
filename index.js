'use strict';
/**
 * @file browser-language main
 * @module browser-language
 * @version 1.6.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var headerRegex = /([a-z]{2})/ig;
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
 * @param {Object} my - user option
 * @param {Object} res - response to client
 * @param {String} lang - string for cookie
 * @return {String}
 */
function set(my, res, lang) {

  return res.cookie(my.cookie, lang, {
    domain: my.domain,
    path: my.path,
    maxAge: my.maxAge,
    httpOnly: my.httpOnly,
    secure: my.secure,
    signed: my.signed
  }), lang;
}

/**
 * detect browser language
 * 
 * @param {String} ll - default language as fallback
 * @param {String} header - accept-language header
 * @param {Object} lang - languages dictionary
 * @returns {String}
 */
function detect(ll, header, lang) {

  if (header) { // check
    var language = header.match(headerRegex); // grep languages header

    language = language.filter(function(elem, pos, self) { // remove duplicate

      return self.indexOf(elem.toLowerCase()) === pos;
    });

    var tmp;
    for (var i = 0, ii = language.length; i < ii; ++i) { // detect righ language
      if ((tmp = lang[language[i]])) {
        return tmp;
      }
    }

  }
  return ll; // return default
}

/**
 * setting options
 * 
 * @exports language
 * @function language
 * @param {Object} opt - various options. Check README.md
 * @return {Function}
 */
function language(opt) {

  var options = opt || Object.create(null);
  var include = __dirname + '/min/lib/dictionary.js';
  var lang = options.dictionary || require(include).LANG;
  var my = {
    cookie: String(options.cookie || 'lang'),
    domain: String(options.domain || ''),
    path: String(options.path || '/'),
    maxAge: Number(options.maxAge) || 1000 * 3600 * 24 * 365,
    httpOnly: Boolean(options.httpOnly),
    secure: Boolean(options.secure),
    signed: Boolean(options.signed)
  };

  if (lang._default === undefined) {
    lang = require(include).LANG;
  } else if (!all[lang._default]) {
    console.error('language misconfigured');
    lang = require(include).LANG;
  }
  /**
   * @global
   */
  process.env.lang = lang._default;
  // return
  var cookie = 'cookies';
  if (my.signed) {
    cookie = 'signedCookies';
  }

  if (typeof options.encryptionSecret === 'string') {
    var vault = require('cookie-encryption');
    var encryptionOptions = opt.encryptionOptions || Object.create(null);
    vault = vault(options.encryptionSecret, {
      cookie: my.cookie,
      cipher: encryptionOptions.cipher,
      encoding: encryptionOptions.encoding,
      extra: encryptionOptions.extra,
      domain: encryptionOptions.domain || my.domain,
      path: encryptionOptions.path || my.path,
      maxAge: encryptionOptions.maxAge || my.maxAge,
      httpOnly: encryptionOptions.httpOnly || my.httpOnly,
      secure: encryptionOptions.secure || my.secure,
      signed: encryptionOptions.signed || my.signed
    });

    /**
     * detect language and (if accepted) build it. Store information on cookie
     * 
     * @function browser
     * @param {Object} req - client request
     * @param {Object} res - response to client
     * @param {next} next - continue routes
     */
    return function browser(req, res, next) {

      var biscotto;
      try {
        biscotto = vault.read(req);
      } catch (e) { // fails to decrpy
        biscotto = undefined;
      }
      if (biscotto && lang[biscotto]) { // lookup
        req[cookie][my.cookie] = biscotto;
        return next();
      }

      var ll = detect(lang._default, req.headers['accept-language'], lang);
      req[cookie][my.cookie] = vault.write(req, ll); // populate req[cookie] by module

      return next();
    };
  }

  /**
   * detect language and (if accepted) build it. Store information on cookie
   * 
   * @function browser
   * @param {Object} req - client request
   * @param {Object} res - response to client
   * @param {next} next - continue routes
   */
  return function browser(req, res, next) {

    var biscotto = req[cookie];
    if (biscotto === undefined) {
      biscotto = Object.create(null);
    } else if (lang[biscotto[my.cookie]]) { // lookup
      return next();
    }

    var ll = detect(lang._default, req.headers['accept-language'], lang);
    biscotto[my.cookie] = set(my, res, ll);

    return next();
  };
}
module.exports = language;
