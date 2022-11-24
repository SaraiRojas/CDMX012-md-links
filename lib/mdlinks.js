const fs = require('fs');
const path = require('path');

const doesPathExist = require('./path-validation');
const getMdFiles = require('./traverse-dir');
const getLinks = require('./get-links');
const linksValidation = require('./links-validation');

/**
 * Validates links that are contained in markdown files
 * @param {String} _path path provided via CLI
 * @param {Object} _options boolean values according to options introduced via CLI
 * @returns {Promise} Resolve value is an object containing links information
 */
const mdLinks = (_path, askValidation) => new Promise((resolve, reject) => {
  const pathResolve = path.resolve(_path);
  let links;

  if (doesPathExist(pathResolve)) {
    const isDirectory = fs.statSync(pathResolve).isDirectory();

    if (isDirectory) {
      const mdFiles = getMdFiles(pathResolve); // manejo de promesas de la función getMdFiles !
      links = getLinks(mdFiles);
    } else if (path.extname(pathResolve) === '.md') {
      links = getLinks([pathResolve]);
    } else {
      reject('\nPath provided is not a markdown file\n\n');
    }

    switch (`${askValidation}`) {
      case 'true':
        resolve(linksValidation(links));
        break;

      default:
        resolve(links);
        break;
    }
  } else {
    reject('\nPath provided does not exist\n\n');
  }
});

module.exports = mdLinks;
