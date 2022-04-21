const fs = require('fs');
const path = require('path');

/**
 * Gets markdown files path
 * @param {String} dir a directory path
 * @returns {Array} Contains just markdown files path
 */
const getMdFiles = (dir) => {
  let Files = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    if (isDirectory) {
      Files = Files.concat(getMdFiles(filePath));
    } else if (path.extname(file) === '.md') {
      Files.push(filePath);
    }
  });
  return Files;
};

module.exports = getMdFiles;
