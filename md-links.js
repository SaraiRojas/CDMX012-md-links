/* eslint-disable prefer-promise-reject-errors */
const fs = require('fs');
const path = require('path');

const commandValidation = require('./lib/command-validation');
const doesPathExist = require('./lib/path-validation');
const getMdFiles = require('./lib/traverse-dir');
const getLinks = require('./lib/get-links');
const linksValidation = require('./lib/links-validation');
const getStats = require('./lib/stats');

const inputPath = process.argv[2];
const validation = process.argv[3];
const stats = process.argv[4];

const options = commandValidation(validation, stats);

// eslint-disable-next-line no-unused-vars
/**
 * Validates links that are contained in markdown files
 * @param {String} _path path provided via CLI
 * @param {Object} _options boolean values according to options introduced via CLI
 * @returns {Promise} Resolve value is an object containing links information
 */
const mdLinks = (_path, _options) => new Promise((resolve, reject) => {
  if (_path === undefined) {
    reject('Please introduce a path\n\n');
  }
  if (_options === null) {
    reject('Wrong command: Valid options\n\n --validate\n --stats\n --validate --stats\n\n');
  }
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
    switch (`${_options.validate}|${_options.stats}`) {
      case 'true|true':
        linksValidation(Links)
          .then((res) => {
            resolve(getStats(res, true));
          });
        break;

      case 'true|false':
        resolve(linksValidation(Links));
        break;

      case 'false|true':
        resolve(getStats(Links, false));
        break;

      case 'false|false':
        resolve(Links);
        break;
    }
  } else {
    reject('Path provided does not exist\n\n');
  }
});

module.exports = mdLinks;

mdLinks(inputPath, options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    process.stdout.write(err);
  });
