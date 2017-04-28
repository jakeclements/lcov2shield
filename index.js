const fs = require('fs');
const byline = require('byline');

const linesRatio = function(filePath, cb = () => {}) {

  const readStream = fs.createReadStream(filePath);
  const stream = byline(readStream, { encoding: 'utf8' });

  let instrumentedLines = 0;
  let coveredLines = 0;

  stream.on('data', function(line){

    if (line.indexOf('LF:') === 0) {
      instrumentedLines += parseFloat(line.split(':')[1]);
    }

    if(line.indexOf('LH:') === 0) {
      coveredLines += parseFloat(line.split(':')[1]);
    }

  });

  stream.on('error', cb);

  stream.on('end', function(){
    cb(null, coveredLines / instrumentedLines);
  });
}

const getPercent = function() {

}

exports.badgify = function(coveragePath, readmePath) {
  linesRatio(coveragePath, (err, ratio) => {
		if(err) return console.log(err);
    const percent = Math.round(ratio * 100);
    console.log(percent);
  });
  return this;
}
