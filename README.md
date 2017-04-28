# lcov2shield
Produce a link to a shields.io badge from a lcov.info file
*Based on the [lcov2badge](https://github.com/albanm/lcov2badge) repo.*

## Install
```javascript
yarn install lcov2shield
```

## Usage
```javascript
const lcov2shield = require('lcov2shield');
lcov2shield.badgify('./coverage/lcov.info', 'README.md');
```
