const fs = require('fs');
const path = require('path');

const traversDir = (dir) => {
  let Files = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    if (isDirectory) {
      Files = Files.concat(traversDir(filePath));
    } else if (path.extname(file) === '.md') {
      const resolvePath = path.resolve(filePath);
      Files.push(resolvePath);
    }
  });

  return Files;
};

// console.log(traversDir('../docs'));

// readfile
// const data = fs.readFileSync(filePath, 'utf-8');

module.exports = traversDir;
