'use strict';
const Linter = require('tslint').Linter;
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const options = {
  fix: false,
  formatter: 'json'
};

function getFileNames(configFilePath, pathsToLint) {
  if (typeof pathsToLint === 'string') {
    pathsToLint = [pathsToLint];
  } else if (!pathsToLint) {
    pathsToLint = [path.dirname(configFilePath)];
  }

  let allFiles = [];

  pathsToLint.forEach((pathToLint) => {
    const program = Linter.createProgram(configFilePath, pathToLint);

    allFiles = allFiles.concat(Linter.getFileNames(program));
  });

  allFiles = Array.from(new Set(allFiles));
  return allFiles;
}

function test(file, config) {
  it(`should have no errors in ${file}`, (done) => {
    fs.readFile(file, (err, sourceBuffer) => {
      const linter = new Linter(options);
      const source = sourceBuffer.toString();
      linter.lint(file, source.toString(), config);
      const result = linter.getResult();

      if (result.failureCount > 0) {
        const errorMessage = [chalk.red('Code did not pass lint rules')];
        result.failures.forEach((failure) => {
          const lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
          const character = lineAndCharacter.character;
          const line = lineAndCharacter.line;
          errorMessage.push(`${failure.getFailure()} at line ${line + 1}, character ${character + 1}`);
        });

        done(new Error(errorMessage.join('\n\t')));
      } else {
        done();
      }
    });

  });
}

module.exports = function(configFilePath, pathsToLint) {
  describe('tslint', () => {
    const fileNames = getFileNames(configFilePath, pathsToLint);
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
