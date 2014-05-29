"use strict";
/**
 * dictionary of browser-language
 * 
 * @file browser-language dictionary
 * @module browser-language
 * @subpackage lib
 * @version 1.0.3
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/**
 * settings export
 * 
 * @global
 * @exports LANG
 */
var LANG = Object.create(null,{
    _default: {
        enumerable: true,
        writable: false,
        configurable: false,
        value: 'en',
    },
    en: {
        enumerable: true,
        writable: false,
        configurable: false,
        value: 'en',
    },
    it: {
        enumerable: true,
        writable: false,
        configurable: false,
        value: 'it',
    },
    de: {
        enumerable: true,
        writable: false,
        configurable: false,
        value: 'de',
    },
    fr: {
        enumerable: true,
        writable: false,
        configurable: false,
        value: 'fr',
    },

});

module.exports.LANG = LANG;
