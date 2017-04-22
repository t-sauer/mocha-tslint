'use strict';

const lint = require('../../index.js');
const configPath = './tests/fixtures/failing/tslint.json';

lint(configPath);
