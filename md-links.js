/* eslint-disable prefer-promise-reject-errors */
const fs = require('fs');
const path = require('path');

const commandValidation = require('./lib/command-validation');
const doesPathExist = require('./lib/path-validation');
const getMdFiles = require('./lib/traverse-dir');
const getLinks = require('./lib/get-links');

const inputPath = process.argv[2];
const validation = process.argv[3];
const stats = process.argv[4];

const options = commandValidation(validation, stats);
console.log(options);

// eslint-disable-next-line no-unused-vars
const mdLinks = (_path, _options) => new Promise((resolve, reject) => {
  const pathResolve = path.resolve(_path);
  let Links;

  if (doesPathExist(pathResolve)) {
    const isDirectory = fs.statSync(pathResolve).isDirectory();

    if (isDirectory) {
      const mdFiles = getMdFiles(pathResolve);
      Links = getLinks(mdFiles);
    } else {
      Links = getLinks([pathResolve]);
    }

    if (!_options.validate && !_options.stats) {
      resolve(Links);
    }
  } else {
    reject('Path provided does not exist\n\n');
  }
});

mdLinks(inputPath, options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    process.stdout.write(err);
  });
