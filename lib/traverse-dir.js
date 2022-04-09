const fs = require('fs');
const path = require('path');

const traversDir = (dir) => {
  const files = fs.readdirSync(dir);

  console.log('\nDirectory filenames:');

  files.forEach((file) => {
    console.log(file);
    const filePath = path.join(dir, file);
    console.log(path.resolve(filePath));
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log(data);
  });
};

console.log(traversDir('../docs'));
