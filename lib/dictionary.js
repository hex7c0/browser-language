"use strict";
/**
 * browser-language
 * 
 * @package browser-language
 * @subpackage lib
 * @version 0.0.1
 * @author hex7c0 <0x7c0@teboss.tk>
 * @license GPLv3
 * @overview main module
 * @copyright hex7c0 2014
 */

/**
 * settings export
 */
// configuration
var LANG = Object.create(null, {
    _default : {
        enumerable : true,
        writable : false,
        configurable : false,
        value : 'en',
    },
    en : {
        enumerable : true,
        writable : false,
        configurable : false,
        value : 'en',
    },
    it : {
        enumerable : true,
        writable : false,
        configurable : false,
        value : 'it',
    },
    de : {
        enumerable : true,
        writable : false,
        configurable : false,
        value : 'de',
    },
    fr : {
        enumerable : true,
        writable : false,
        configurable : false,
        value : 'fr',
    },

});

exports.LANG = LANG;
