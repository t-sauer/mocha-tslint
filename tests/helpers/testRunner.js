'use strict';

var Mocha = require('mocha');
var Promise = require('es6-promise').Promise;

function runTest(file) {

  var mocha = new Mocha({
    // For some reason, tests take a long time on Windows (or at least AppVeyor)
    timeout: 2000,
    reporter: 'min'
  });

  mocha.addFile(file);

  var output, originalWrite;
  output = [];
  originalWrite = process.stdout.write;
  process.stdout.write = function(str) {
    output.push(str.toString('utf8'));
  };

  return new Promise(function(resolve) {
    mocha.run(function (failures) {
      process.stdout.write = originalWrite;
      resolve(output);
    });
  })
}

exports.runTest = runTest;
