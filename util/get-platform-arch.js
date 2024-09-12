'use strict';

const os = require('os');

process.stdout.write(`${os.platform()}-${os.arch()}`);