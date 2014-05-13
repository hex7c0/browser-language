logger-request [![Build Status](https://travis-ci.org/hex7c0/logger-request.svg?branch=master)](https://travis-ci.org/hex7c0/logger-request) [![NPM version](https://badge.fury.io/js/logger-request.svg)](http://badge.fury.io/js/logger-request)
==============

simple logger middleware for express

## API

```js
var app = require('express')();
var logger-request = require('logger-request');

app.use(logger-request({filename:'pippo.log'}));
```

### logger-request(options)

Setup session store with the given `options`.

#### Options

  - `filename` - The filename of the logfile to write output to.
  - `maxsize` - Max size in bytes of the logfile, if the size is exceeded then a new file is created.
  - `json` - If true, messages will be logged as JSON (default true).

releated to https://github.com/flatiron/winston#file-transport

## License
Copyright (c) 2014 hex7c0
Licensed under the GPLv3 license.