// const fs = require('fs');

const commandValidation = require('./lib/command-validation');
const doesPathExist = require('./lib/path-validation');
const getMdFiles = require('./lib/traverse-dir');

const inputPath = process.argv[2];
const validation = process.argv[3];
const stats = process.argv[4];

const options = commandValidation(validation, stats);
console.log(options);

const pathExistance = doesPathExist(inputPath);

if (pathExistance) {
  const mdFiles = getMdFiles(inputPath);
  console.log(mdFiles);
} else {
  console.log('Error');
}
