const fs = require('fs');

const getLinks = (filePath) => new Promise((resolve, reject) => {
  const readableStream = fs.createReadStream(filePath, 'utf8');

  readableStream.on('error', (error) => reject(error));
  readableStream.on('data', (chunk) => resolve(chunk.match(/\bhttp(s)?[^)|\s]*/g)));
});

// getLinks('../docs/doc-1.md')
//   .then((links) => console.log(links));

module.exports = getLinks;
