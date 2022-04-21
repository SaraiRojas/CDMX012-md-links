/* eslint-disable prefer-promise-reject-errors */
const fs = require('fs');
const path = require('path');

const doesPathExist = require('./lib/path-validation');
const getMdFiles = require('./lib/traverse-dir');
const getLinks = require('./lib/get-links');
const linksValidation = require('./lib/links-validation');
const getStats = require('./lib/stats');

// eslint-disable-next-line no-unused-vars
const mdLinks = (_path, _options) => new Promise((resolve, reject) => {
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

    // eslint-disable-next-line default-case
    switch (`${_options.validation}|${_options.stats}`) {
      case 'true|true':
        linksValidation(Links)
          .then((res) => {
            resolve(getStats(res, true));
          });
        break;

      case 'true|undefined':
        resolve(linksValidation(Links));
        break;

      case 'undefined|true':
        resolve(getStats(Links, false));
        break;

      case 'undefined|undefined':
        resolve(Links);
        break;
    }
  } else {
    reject('Path provided does not exist\n\n');
  }
});

module.exports = mdLinks;
