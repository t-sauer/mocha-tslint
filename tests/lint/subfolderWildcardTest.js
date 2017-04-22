'use strict';

const lint = require('../../index.js');
const configPath = './tests/fixtures/subfolder/tslint.json';

const folders = 'tests/fixtures/subfolder/*';

lint(configPath, folders);
