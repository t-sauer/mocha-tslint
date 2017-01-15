var Linter = require('tslint').Linter;
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var options = {
  fix: false,
  formatter: 'json',

}

var linter = new Linter(options);

function getFileNames(configFilePath) {
  var program = Linter.createProgram(configFilePath, path.dirname(configFilePath));
  var fileNames = Linter.getFileNames(program);

  return fileNames;
}

function test(file, config) {
  it('should have no errors in ' + file, function(done) {
    fs.readFile(file, function(err, sourceBuffer) {
      var source = sourceBuffer.toString();
      linter.lint(file, source.toString(), config);
      var result = linter.getResult();

      if (result.failureCount > 0) {
        done(new Error(
          chalk.red('Code did not pass lint rules') +
          result.failurCount
        )); 
      } else {
        done();
      }
    });

  });
}

// var linter = new Linter(options);
// linter.lint('./fixtures/test.ts', );

module.exports = function(configFilePath) {
  describe('tslint', function() {
    var tslintConfig = {};
    var fileNames = getFileNames(configFilePath);

    try {
      var config = fs.readFileSync(configFilePath).toString();
      tslintConfig = JSON.parse(config);
    } catch(e) {}

    fileNames.forEach(function(file) {
      test(file, tslintConfig);
    });
  });
}
