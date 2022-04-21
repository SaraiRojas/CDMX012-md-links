const path = require('path');
const fs = require('fs');

/**
 * Verifies if a path is absolute, if not it is converted to absolute
 * @param {String} inputPath inputPath path provided via CLI
 * @returns {String} absolute path
 */
const resolvePath = (inputPath) => {
  const isAbsolutePath = path.isAbsolute(inputPath);

  if (isAbsolutePath) {
    return inputPath;
  }

  return path.resolve(inputPath);
};

/**
 * Verifies if a path exists
 * @param {path} inputPath path provided via CLI
 * @returns {Boolean}
 */
const doesPathExist = (inputPath) => {
  const dir = resolvePath(inputPath);

  if (fs.existsSync(dir)) {
    return true;
  }
  return false;
};

module.exports = doesPathExist;
