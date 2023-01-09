#!/usr/bin/env node

const yargs = require('yargs');
const mdLinks = require('../lib/mdlinks');
const outputs = require('../lib/helpers');

const usage = '\nUsage: md-links <file/dir_path> --validate --stats'; const options = yargs
  .scriptName('md-links')
  .usage(usage)
  .example(
    '$0 ./docs --validate --stats',
    'Returns and object with the following keys: total, unique and broken.',
  )
  .option('v', {
    alias: 'validate',
    describe: 'Validates links through a HTTP request',
    type: 'boolean',
    demandOption: false,
  })
  .option('s', {
    alias: 'stats',
    describe: 'Gives basic or advanced stats about the links',
    type: 'boolean',
    demandOption: false,
  })
  .demandCommand(1, '\nIntroduce a file or directory path')
  .strictOptions()
  .showHelpOnFail(false, 'Specify --help for available options')
  .help(true)
  .epilog('Laboratoria CDMX012/ Sarai Rojas')
  .argv;

const inputPath = options._[0];
const opt = {
  validation: options.validate,
  stats: options.stats,
};

mdLinks(inputPath, opt.validation)
  .then((res) => {
    const request = `${opt.validation}|${opt.stats}`;
    outputs[request](res);
  })
  .catch((err) => {
    console.log(err.message);
  });
