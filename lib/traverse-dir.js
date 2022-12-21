const fs = require('fs');
const path = require('path');

/**
 * Gets markdown files path
 * @param {String} dir a directory path
 * @returns {Array} Contains just markdown files path
 */
const getMdFiles = async (dir) => {
  let mdFiles = [];
  const files = await fs.promises.readdir(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    if (isDirectory) {
      mdFiles = mdFiles.concat(getMdFiles(filePath));
    } if (path.extname(file) === '.md') {
      mdFiles.push(filePath);
    }
  });

  const result = await Promise.all(mdFiles);
  return result.flat();
};

module.exports = getMdFiles;
