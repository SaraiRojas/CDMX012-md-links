const fs = require('fs');

const commandValidation = require('./lib/command-validation');
const doesPathExist = require('./lib/path-validation');

const inputPath = process.argv[2];
const validation = process.argv[3];
const stats = process.argv[4];

const options = commandValidation(validation, stats);
console.log(options);

const pathExistance = doesPathExist(inputPath);
console.log(pathExistance);

if (pathExistance) {
  const isDirectory = fs.statSync(inputPath).isDirectory();
  console.log(isDirectory);
}
