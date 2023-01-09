const colors = require('colors');
const getStats = require('./stats');

// Color themes
colors.setTheme({
  key: 'magenta',
  title: 'grey',
});

const returnValidation = (res) => res.forEach((item) => {
  console.log('\nfile:'.key, `${item.file}\n`
    + 'href:'.key, `${item.href}\n`
  + 'text:'.key, `${item.text}\n`
  + 'statusCode:'.key, `${item.statusCode}\n`
  + 'statusText:'.key, `${item.statusText}\n`);
});

const returnStats = (res) => {
  const basicStats = getStats(res, false);

  console.log('\nBasic stats\n\n'.title
    + 'total:'.key, `${basicStats.total}\n`
  + 'unique:'.key, `${basicStats.unique}\n`);
};

const returnValidationAndStats = (res) => {
  const advancedStats = getStats(res, true);

  console.log('\nAdvanced stats\n\n'.title
    + 'total:'.key, `${advancedStats.total}\n`
  + 'unique:'.key, `${advancedStats.unique}\n`
  + 'broken:'.key, `${advancedStats.broken}\n`);
};

const returnJustLinks = (res) => res.forEach((item) => {
  console.log('\nfile:'.key, `${item.file}\n`
    + 'href:'.key, `${item.href}\n`
  + 'text:'.key, `${item.text}\n`);
});

const outputs = {
  'true|undefined': returnValidation,
  'undefined|true': returnStats,
  'true|true': returnValidationAndStats,
  'undefined|undefined': returnJustLinks,
};

module.exports = outputs;
