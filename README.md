#browser-language [![Build Status](https://travis-ci.org/hex7c0/browser-language.svg?branch=master)](https://travis-ci.org/hex7c0/browser-language) [![NPM version](https://badge.fury.io/js/browser-language.svg)](http://badge.fury.io/js/browser-language)

grab browser language for [expressjs](http://expressjs.com/)

## Installation

Install through NPM

```
npm install browser-language
```
or
```
git clone git://github.com/hex7c0/browser-language.git
```

## API

```js
var app = require('express')();
var cookie = require('cookie-parser');
var language = require('browser-language');
app.use(cookie('foo'));

app.use(language({
    dictionary : {
        _default : 'en',
        en : 'en',
    },
    cookie : 'new_cookie_name',
}));
```

### language(options)

#### Options

  - `dictionary` - Accepted language
- - `_default` - The dafault value, if request from client cannot be evaluated
- - `en` - Set cookie with 'en' value
- - `it` - Set cookie with 'it' value
- - `..` - Set cookie with '..' value
  - `cookie` - name for cookie
  - `age` - age for cookie

`dictionary` object with correct value to be added, otherwise using a default dictionary inside /lib/dictionary.js

#### Examples

Take a look at my [examples](https://github.com/hex7c0/browser-language/tree/master/examples)

## License
Copyright (c) 2014 hex7c0

Licensed under the GPLv3 license.
