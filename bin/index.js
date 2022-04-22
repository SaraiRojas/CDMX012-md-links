#!/usr/bin/env node
/* eslint-disable prefer-template */

const yargs = require('yargs');
const colors = require('colors');
const mdLinks = require('../lib/mdlinks');
const getStats = require('../lib/stats');

// Color themes
colors.setTheme({
  key: 'magenta',
  title: 'grey',
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

mdLinks(inputPath, opt.validation)
  .then((res) => {
    switch (`${opt.validation}|${opt.stats}`) {
      case 'true|undefined':
        res.forEach((item) => {
          console.log('\nfile:'.key, `${item.file}\n`
                      + 'href:'.key, `${item.href}\n`
                      + 'text:'.key, `${item.text}\n`
                      + 'statusCode:'.key, `${item.statusCode}\n`
                      + 'statusText:'.key, `${item.statusText}`);
        });
        break;

      case 'undefined|true': {
        const basicStats = getStats(res, false);

        console.log('\nBasic stats\n\n'.title
                    + 'total:'.key, `${basicStats.total}\n`
                    + 'unique:'.key, `${basicStats.unique}`);
        break;
      }

      case 'true|true': {
        const advancedStats = getStats(res, true);

        console.log('\nAdvanced stats\n\n'.title
                    + 'total:'.key, `${advancedStats.total}\n`
                    + 'unique:'.key, `${advancedStats.unique}\n`
                    + 'broken:'.key, `${advancedStats.broken}`);
        break;
      }

      default:
        res.forEach((item) => {
          console.log('\nfile:'.key, `${item.file}\n`
                    + 'href:'.key, `${item.href}\n`
                    + 'text:'.key, `${item.text}`);
        });
        break;
    }
  })
  .catch((err) => {
    process.stdout.write(err);
  });
