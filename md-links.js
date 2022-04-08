const commandValidation = require('./command-validation');

// const path = process.argv[2];
const validation = process.argv[3];
const stats = process.argv[4];

const options = commandValidation(validation, stats);
console.log(options);
