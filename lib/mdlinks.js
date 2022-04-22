/* eslint-disable prefer-promise-reject-errors */
const fs = require('fs');
const path = require('path');

const doesPathExist = require('./path-validation');
const getMdFiles = require('./traverse-dir');
const getLinks = require('./get-links');
const linksValidation = require('./links-validation');

// eslint-disable-next-line no-unused-vars
const mdLinks = (_path, askValidation) => new Promise((resolve, reject) => {
  const pathResolve = path.resolve(_path);
  let Links;

  if (doesPathExist(pathResolve)) {
    const isDirectory = fs.statSync(pathResolve).isDirectory();

    if (isDirectory) {
      const mdFiles = getMdFiles(pathResolve);
      Links = getLinks(mdFiles);
    } else if (path.extname(pathResolve) === '.md') {
      Links = getLinks([pathResolve]);
    } else {
      reject('Path provided is not a markdown file\n\n');
    }

    switch (`${askValidation}`) {
      case 'true':
        resolve(linksValidation(Links));
        break;

      default:
        resolve(Links);
        break;
    }
  } else {
    reject('Path provided does not exist\n\n');
  }
});

module.exports = mdLinks;
