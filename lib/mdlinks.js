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
const mdLinks = async (_path, askValidation) => { // async wraps the result of the function with a promise https://stackoverflow.com/questions/45348955/using-await-within-a-promise
  const pathResolve = path.resolve(_path);
  let links;

  if (doesPathExist(pathResolve)) {
    const isDirectory = fs.statSync(pathResolve).isDirectory();

    if (isDirectory) {
      const mdFiles = await getMdFiles(pathResolve);
      links = getLinks(mdFiles);
    } else if (path.extname(pathResolve) === '.md') {
      links = getLinks([pathResolve]);
    } else {
      throw Error('\nPath provided is not a markdown file\n\n');
    }

    switch (`${askValidation}`) {
      case 'true':
        return linksValidation(links);

      default:
        return links;
    }
  } else {
    throw Error('\nPath provided does not exist\n\n');
  }
};

module.exports = mdLinks;
