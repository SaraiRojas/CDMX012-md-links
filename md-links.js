const commandValidation = require('./command-validation');
const doesPathExist = require('./path-validation');

const inputPath = process.argv[2];
const validation = process.argv[3];
const stats = process.argv[4];

const options = commandValidation(validation, stats);
console.log(options);

const pathExistance = doesPathExist(inputPath);
console.log(pathExistance);
