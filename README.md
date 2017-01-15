# mocha-tslint

A simple way to run [TSLint](https://palantir.github.io/tslint/) in your
[Mocha](http://mochajs.org/) tests without a task runner like Grunt or Gulp.

Inspired by [mocha-jshint](https://github.com/Muscula/mocha-jshint) and [mocha-eslint](https://github.com/BadgeLabs/mocha-eslint).

## Installation

You can install into your Node.js project as a development dependency with:
```sh
npm install --save-dev mocha-tslint
```
`mocha-tslint` will install TSLint for itself, so you don't need to worry about
adding it to your consuming module.

The same is not true for Mocha. You should already have Mocha installed in your
consuming module.

## Usage

After mocha-tslint is installed, you can use it by creating a test file for
Mocha and requiring `mocha-tslint` like so:
```javascript
var lint = require('mocha-tslint');
```
This will return a function with the signature:
```javascript
lint(configFilePath)
```
where `configFilePath` is the path to your `tslint.json` from your project's top 
level directory. 


So, a full test file to run in Mocha might look like:
```javascript
var lint = require('mocha-tslint');
var configFilePath = './tslint.json';
lint(configFilePath);
```

## Notes

This module does not make any decisions about which TSLint rules to run. You need a 
`tslint.json` file in order for this module to work at all.
