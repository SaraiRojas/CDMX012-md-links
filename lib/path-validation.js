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
 * @returns {Promise<void>}
 */
const doesPathExist = async (inputPath) => {
  const dir = resolvePath(inputPath);
  const pathExistance = await fs.promises.access(dir); // use acess to verify if a path exists https://stackoverflow.com/a/59697728

  return pathExistance;
};

module.exports = doesPathExist;
