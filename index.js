const config = require('./config');
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

const getCol = (percent, thresholds) => {
  const colObject = thresholds
  	.filter(t => percent >= t.threshold)
    .reduce((a, c) => a < c ? c : a);
  return colObject.color;
}

const writeBadgeToFile = (readmePath, string, options) => {
  const { writeToLine, createImg } = options;
  const data = fs.readFileSync(readmePath).toString().split("\n");
  data[writeToLine - 1] = createImg(string);
  const text = data.join("\n");
  fs.writeFile(readmePath, text, function (err) {
    if (err) return console.log(err);
  });
}

exports.badgify = function(coveragePath, readmePath, opts = {}) {
  // merge options
  const options = Object.assign({}, config.defaultOptions, opts);
  linesRatio(coveragePath, (err, ratio) => {
		if(err) return console.log(err);
    const { shieldUrl, subject, fileType, thresholds } = options;
    const percent = Math.round(ratio * 100);
    const color = getCol(percent, thresholds);
    const url = options.createUrl({
      shieldUrl,
      subject,
      percent,
      color,
      fileType,
    });
    writeBadgeToFile(readmePath, url, options);
  });
  return this;
}
