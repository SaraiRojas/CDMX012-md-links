const fs = require('fs');
// const path = require('path');

const commandValidation = require('./lib/command-validation');
const doesPathExist = require('./lib/path-validation');
const getMdFiles = require('./lib/traverse-dir');
const get = require('./lib/get-links');

const inputPath = process.argv[2];
const validation = process.argv[3];
const stats = process.argv[4];

const options = commandValidation(validation, stats);
console.log(options);

// eslint-disable-next-line no-unused-vars
const mdLinks = (_path, _options = options) => new Promise((resolve, reject) => {
  // const pathResolve = path.resolve(_path);
  // let Links;
  if (doesPathExist(_path)) {
    const isDirectory = fs.statSync(_path).isDirectory();
    if (isDirectory) {
      const mdFiles = getMdFiles(_path);
      resolve(get.LinksFiles(mdFiles));
    } else {
      resolve(get.LinksFile(_path));
    }
  } else {
    reject(new Error('Path provided does not exist'));
  }
});

mdLinks(inputPath)
  .then((res) => {
    console.log(res.flat());
  });
