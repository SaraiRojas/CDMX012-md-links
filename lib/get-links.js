const fs = require('fs');

const LinksFile = (filePath) => new Promise((resolve, reject) => {
  const readableStream = fs.createReadStream(filePath, 'utf8');

  readableStream.on('error', (error) => reject(error));
  readableStream.on('data', (chunk) => {
    const links = chunk.match(/\bhttp(s)?[^)|\s]*/g);
    if (links != null) {
      resolve(links);
    } else {
      resolve([]);
    }
  });
});

const LinksFiles = (files) => new Promise((resolve) => {
  const promises = [];
  files.forEach((file) => {
    promises.push(LinksFile(file)
      .then((links) => links));
  });
  resolve(Promise.all(promises));
});

module.exports = {
  LinksFile,
  LinksFiles,
};
