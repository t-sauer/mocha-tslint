'use strict';

var lint = require('../../index.js');
var configPath = 'tests/fixtures/failing/tslint.json';

lint(configPath);
