'use strict';

const runTest = require('../helpers/testRunner.js').runTest;

describe('Acceptance: mocha-tslint', () => {

  it('should pass test for lintSucceed.ts', () => {
    return runTest('tests/lint/passingLintTest.js').then((results) => {
      if (results[3].indexOf('1 passing') === -1) {
        throw new Error('Did not get a passing test');
      }
    });
  });

  it('should fail test for lintFail.ts', () => {
    return runTest('tests/lint/failingLintTest.js').then((results) => {
      if (results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a failing test');
      }

      const reasonsCount = results[6].split('\n')
          .filter((line) => line.indexOf('Code did not pass lint rules') !== -1)
          .length;

      if (reasonsCount !== 1) {
        throw new Error(`Counted ${reasonsCount} failure reasons`);
      }
    });
  });
});
