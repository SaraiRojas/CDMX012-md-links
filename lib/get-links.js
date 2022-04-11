const fs = require('fs');

const getLinks = (filePath) => {
  const readableStream = fs.createReadStream(filePath, 'utf8');

  readableStream.on('error', (error) => {
    console.log(`error: ${error.message}`);
  });

  readableStream.on('data', (chunk) => {
    console.log(chunk.match(/\bhttp(s)?[^)|\s]*/g));
  });
};

// getLinks('../docs/doc-1.md');

module.exports = getLinks;
