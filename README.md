# [browser-language](http://supergiovane.tk/#/browser-language)

[![NPM version](https://badge.fury.io/js/browser-language.svg)](http://badge.fury.io/js/browser-language)
[![Build Status](https://travis-ci.org/hex7c0/browser-language.svg?branch=master)](https://travis-ci.org/hex7c0/browser-language)
[![devDependency Status](https://david-dm.org/hex7c0/browser-language/dev-status.svg)](https://david-dm.org/hex7c0/browser-language#info=devDependencies)

Grab browser language and store min value on cookie for [nodejs](http://nodejs.org).
If `browser['Accept-Language'] = it-IT,it;q=0.8,en-US;q=0.6,en;q=0.4`, store `it` on cookie, otherwise, if language is not available, store default language `en`

## Installation

Install through NPM

```bash
npm install browser-language
```
or
```bash
git clone git://github.com/hex7c0/browser-language.git
```

## API

_Normal_ use inside expressjs project
```js
var language = require('browser-language');
var app = require('express')();

app.use(language());
```

_Signed_ use inside expressjs project
```js
var language = require('browser-language');
var app = require('express')();
var cookie = require('cookie-parser');

app.use(cookie('foo'));
app.use(language({
    dictionary: {
        _default: 'en',
        en: 'en'
    },
    cookie: 'new_cookie_name',
    signed: true
}));
```

### language(options)

#### options

 - `dictionary` - **Object** Accepted language
  - `_default` - **String** The dafault value, if request from client cannot be evaluated
  - `en` - **String** Set cookie with 'en' value
  - `it` - **String** Set cookie with 'it' value
  - `..` - **String** Set cookie with '..' value
 - `domain` - **String** Domain of cookie *(default "null")*
 - `cookie` - **String** Name of cookie *(default "lang")*
 - `path` - **String** Path of cookie *(default "/")*
 - `age` - **Number** Age of cookie in millisecond *(default "1 year")*
 - `httpOnly` - **Boolean** Flag for http only cookie *(default "false")*
 - `secure` - **Boolean** Flag for using cookie over TLS/SSL *(default "false")*
 - `signed` - **Boolean** Will use the secret passed to cookieParser(secret) to sign the value *(default "false")*

`dictionary` object with correct value to be added, otherwise using a default dictionary inside *./lib/dictionary.js*

## Examples

Take a look at my [examples](https://github.com/hex7c0/browser-language/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)
