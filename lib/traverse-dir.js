const fs = require('fs');
const path = require('path');

/**
 * Gets markdown files path
 * @param {String} dir a directory path
 * @returns {Array} Contains just markdown files path
 */
const getMdFiles = (dir) => fs.promises.readdir(dir)
  .then((filenames) => {
    let mdFiles = [];
    filenames.forEach((file) => {
      const filePath = path.join(dir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      if (isDirectory) {
        mdFiles = mdFiles.concat(getMdFiles(filePath));
      } else if (path.extname(file) === '.md') {
        mdFiles.push(filePath);
      }
    });
    return mdFiles;
  })
  .catch((err) => {
    console.log(err);
  });

// let mdFiles = [];
// const files = fs.readdirSync(dir);

// files.forEach((file) => {
//   const filePath = path.join(dir, file);
//   const isDirectory = fs.statSync(filePath).isDirectory();
//   if (isDirectory) {
//     mdFiles = mdFiles.concat(getMdFiles(filePath));
//   } else if (path.extname(file) === '.md') {
//     mdFiles.push(filePath);
//   }
// });
// return mdFiles;

module.exports = getMdFiles;
