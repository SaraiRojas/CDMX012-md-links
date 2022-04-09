const path = require('path');
const fs = require('fs');

const resolvePath = (inputPath) => {
  const isAbsolutePath = path.isAbsolute(inputPath);

  if (isAbsolutePath) {
    return inputPath;
  }

  return path.resolve(inputPath);
};

const doesPathExist = (inputPath) => {
  const dir = resolvePath(inputPath);

  if (fs.existsSync(dir)) {
    return true;
  }
  return false;
};

module.exports = doesPathExist;
