module.exports = {
  basePath: 'https://img.shields.io/badge',
  defaultOptions: {
    shieldUrl: 'https://img.shields.io/badge/',
    subject: 'coverage',
    percent: 0,
    color: 'red',
    fileType: 'svg',
    writeToLine: 2,
    thresholds: [
      {
        color: 'brightgreen',
        threshold: 95,
      },
      {
        color: 'green',
        threshold: 80,
      },
      {
        color: 'yellowgreen',
        threshold: 60,
      },
      {
        color: 'yellow',
        threshold: 40,
      },
      {
        color: 'orange',
        threshold: 20,
      },
      {
        color: 'red',
        threshold: 0,
      },
    ],
    createUrl: function(details) {
      return `${details.shieldUrl}${details.subject}-${details.percent}%-${details.color}.${details.fileType}`;
    },
    createImg: function(shieldUrl, link = false) {
      if (link) {
        return `[![Build Badge](${shieldUrl})](${link})`;
      }
      return `![Build Badge](${shieldUrl})`;
    }
  },
}
