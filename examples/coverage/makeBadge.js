const lcov2shield = require('../../index');
const path = require('path');

lcov2shield
  .badgify(path.join(__dirname, 'lcov.info'), './README.md');
