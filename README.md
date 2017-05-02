# lcov2shield
![Build Badge](https://img.shields.io/badge/coverage-59%-yellow.png)
Produce a link to a shields.io badge from a lcov.info file.
*Based on the [lcov2badge](https://github.com/albanm/lcov2badge) repo.*

## Install
```sh
yarn install lcov2shield
```

## Usage
```javascript
const lcov2shield = require('lcov2shield');
lcov2shield.badgify('./coverage/lcov.info', 'README.md');
```
