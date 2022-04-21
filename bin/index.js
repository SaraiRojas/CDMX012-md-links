#!/usr/bin/env node
/* eslint-disable prefer-template */

const yargs = require('yargs');
const colors = require('colors');
const mdLinks = require('../md-links');

// Color themes
colors.setTheme({
  key: 'blue',
});

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

mdLinks(inputPath, opt)
  .then((res) => {
    if (opt.validation === undefined && opt.stats === undefined) {
      res.forEach((item) => {
        console.log('file:'.key, `${item.file}\n`
          + 'href:'.key, `${item.href}\n`
          + 'text:'.key, `${item.text}\n`);
      });
    } else if (opt.validation === true && opt.stats === undefined) {
      res.forEach((item) => {
        console.log('file:'.key, `${item.file}\n`
          + 'href:'.key, `${item.href}\n`
          + 'text:'.key, `${item.text}\n`
          + 'statusCode:'.key, `${item.statusCode}\n`
          + 'statusText:'.key, `${item.statusText}\n`);
      });
    } else if (opt.validation === undefined && opt.stats === true) {
      console.log('total:'.key, `${res.total}\n`
      + 'unique:'.key, `${res.unique}\n`);
    } else if (opt.validation === true && opt.stats === true) {
      console.log('total:'.key, `${res.total}\n`
      + 'unique:'.key, `${res.unique}\n`
      + 'broken:'.key, `${res.broken}\n`);
    }
  })
  .catch((err) => {
    process.stdout.write(err);
  });
