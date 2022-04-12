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
const mdLinks = (_path, _options = options) => new Promise((resolve, reject) => {
  const pathResolve = path.resolve(_path);
  const pathExistance = doesPathExist(pathResolve);
  let Links;
  if (pathExistance) {
    const isDirectory = fs.statSync(pathResolve).isDirectory();
    if (isDirectory) {
      const mdFiles = getMdFiles(pathResolve);
      const promises = [];
      mdFiles.forEach((file) => {
        promises.push(getLinks(file)
          .then((links) => links));
      });
      resolve(Promise.all(promises));
      // Links = Promise.all(promises);
    } else {
      resolve(getLinks(pathResolve));
      // getLinks(pathResolve)
      //   .then((links) => resolve(links));
    }
    // Links.then((data) => {
    //   resolve(data);
    // });
  } else {
    reject(new Error('Path provided does not exist'));
  }
});

mdLinks(inputPath)
  .then((res) => {
    console.log(res);
  });
