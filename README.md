# mocha-tslint

[![Greenkeeper badge](https://badges.greenkeeper.io/t-sauer/mocha-tslint.svg)](https://greenkeeper.io/)

A simple way to run [TSLint](https://palantir.github.io/tslint/) in your
[Mocha](http://mochajs.org/) tests without a task runner like Grunt or Gulp.

Inspired by [mocha-jshint](https://github.com/Muscula/mocha-jshint) and 
[mocha-eslint](https://github.com/BadgeLabs/mocha-eslint).

## Installation

You can install `mocha-tslint` into your Node.js project as a development dependency with:

```sh
npm install --save-dev mocha-tslint
```

`mocha-tslint` requires the consuming module to have `mocha`, `tslint` and `typescript` 
as dependencies. This way the consuming application can decide which version to 
use (currently supported versions are TSLint 4.x, 5.x and Typescript 2.x).

## Usage

After mocha-tslint is installed, you can use it by creating a test file for
Mocha and requiring `mocha-tslint` like so:

```javascript
var lint = require('mocha-tslint');
```

This will return a function with the signature:

```javascript
lint(configFilePath, pathsToLint)
```

* `configFilePath`: the path to your `tslint.json` from your project's top 
level directory
* `pathsToLint`: This can either be a string, an array of strings or it can 
                 be left off
  * If left off, linting will be done from the directory of your `tslint.json`
  * If you put in a string or an array of strings you can define which folders 
    to lint.


So, a full test file to run in Mocha might look like:
```javascript
var lint = require('mocha-tslint');
var configFilePath = './tslint.json';

lint(configFilePath);
```

If you only want to lint files placed in `src/` and `test/`:
```javascript
var lint = require('mocha-tslint');
var configFilePath = './tslint.json';
var folders = [
  'src',
  'test'
];

lint(configFilePath, folders);
```

If you only want to lint all files that are in a folder placed in `src/`:
```javascript
var lint = require('mocha-tslint');
var configFilePath = './tslint.json';

lint(configFilePath, 'src/*'); // src/foo.ts won't be linted, but src/foo/bar.ts will be
```

## Notes

This module does not make any decisions about which TSLint rules to run. You need a 
`tslint.json` file in order for this module to work at all.
