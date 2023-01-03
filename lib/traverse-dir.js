const fs = require('fs');
const path = require('path');

// useful lnks
// divide functin in two (1st answer) https://stackoverflow.com/questions/56140639/how-can-i-use-promises-to-get-this-code-to-work-correctly

const getStats = async (dir) => {
  const files = await fs.promises.readdir(dir);
  const stats = files.map(async (file) => {
    const filePath = path.join(dir, file);
    const fileStats = await fs.promises.stat(filePath);
    return {
      file,
      path: filePath,
      isDirectory: fileStats.isDirectory(),
    };
  });
  return Promise.all(stats);
};

/**
 * Gets markdown files path
 * @param {String} dir a directory path
 * @returns {Array} Contains just markdown files path
 */
const getMdFiles = async (dir) => {
  let mdFiles = [];
  const stats = await getStats(dir);

  stats.forEach((stat) => {
    if (stat.isDirectory) {
      mdFiles = mdFiles.concat(getMdFiles(stat.path));
    } else if (path.extname(stat.file) === '.md') {
      mdFiles.push(stat.path);
    }
  });

  const result = await Promise.all(mdFiles);
  return result.flat();
};

module.exports = getMdFiles;
