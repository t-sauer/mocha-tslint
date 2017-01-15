'use strict';

const Mocha = require('mocha');
const glob = require('glob-all');
const chalk = require('chalk');

const mocha = new Mocha({
  timeout: 18000,
  reporter: 'spec'
});

const root = 'tests/acceptance';

function addFiles(mocha, files) {
  glob.sync(root + files).forEach(mocha.addFile.bind(mocha));
}

addFiles(mocha, '/**/*Test.js');

mocha.run((failures) => {
  process.on('exit', () => {
    if (failures === 1) {
      console.log(chalk.red('1 Failing Test'));
    } else if (failures > 1) {
      console.log(chalk.red(failures, 'Failing Tests'));
    } else if (failures === 0) {
      console.log(chalk.green('All Tests Passed!'));
    }
    process.exit(failures);
  });
});
