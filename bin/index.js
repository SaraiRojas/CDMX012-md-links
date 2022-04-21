#!/usr/bin/env node

const yargs = require('yargs');
const mdLinks = require('../md-links');

const usage = '\nUsage: md-links <file/dir_path> --validate --stats'; const options = yargs
  .scriptName('md-links')
  .usage(usage)
  .example(
    '$0 ./docs --validate --stats',
    'Returns and object with the following keys: total, unique and broken.',
  )
  .option('v', {
    alias: 'validate',
    describe: 'Ask for validation',
    type: 'boolean',
    demandOption: false,
  })
  .option('s', {
    alias: 'stats',
    describe: 'Ask for stats',
    type: 'boolean',
    demandOption: false,
  })
  .help(true)
  .epilog('Laboratoria CDMX012/ Sarai Rojas')
  .argv;

const inputPath = options._[0];
const opt = {
  validation: options.validate,
  stats: options.stats,
};

mdLinks(inputPath, opt)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    process.stdout.write(err);
  });
