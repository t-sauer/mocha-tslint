'use strict';

var runTest = require('../helpers/testRunner.js').runTest;

describe('Acceptance: mocha-tslint', function () {

  it('should pass test for lintSucceed.ts', function () {
    return runTest('tests/lint/passingLintTest.js').then(function (results) {
      if (results[3].indexOf('1 passing') === -1) {
        throw new Error('Did not get a passing test');
      }
    });
  });

  it('should fail test for lintFail.ts', function () {
    return runTest('tests/lint/failingLintTest.js').then(function (results) {
      if (results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a failing test');
      }

      var reasonsCount = results[6].split('\n')
          .filter(function(line) { return line.indexOf('Code did not pass lint rules') !== -1; })
          .length;

      if (reasonsCount !== 1) {
        throw new Error('Counted ' + reasonsCount + " failure reasons");
      }
    });
  });
});
