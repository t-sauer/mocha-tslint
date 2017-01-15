'use strict';
const Linter = require('tslint').Linter;
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const options = {
  fix: false,
  formatter: 'json'
};

const linter = new Linter(options);

function getFileNames(configFilePath) {
  const program = Linter.createProgram(configFilePath, path.dirname(configFilePath));
  const fileNames = Linter.getFileNames(program);

  return fileNames;
}

function test(file, config) {
  it(`should have no errors in ${file}`, (done) => {
    fs.readFile(file, (err, sourceBuffer) => {
      const source = sourceBuffer.toString();
      linter.lint(file, source.toString(), config);
      const result = linter.getResult();

      if (result.failureCount > 0) {
        const errorMessage = [chalk.red('Code did not pass lint rules')];
        result.failures.forEach((failure) => {
          const { character, line } = failure.getStartPosition().getLineAndCharacter();
          errorMessage.push(`${failure.getFailure()} at line ${line + 1}, character ${character + 1}`);
        });

        done(new Error(errorMessage.join('\n\t')));
      } else {
        done();
      }
    });

  });
}

module.exports = function(configFilePath) {
  describe('tslint', () => {
    const fileNames = getFileNames(configFilePath);
    let tslintConfig = {};

    try {
      const config = fs.readFileSync(configFilePath).toString();
      tslintConfig = JSON.parse(config);
    } catch (e) {
      // continue regardless of error
    }

    fileNames.forEach((file) => test(file, tslintConfig));
  });
};
