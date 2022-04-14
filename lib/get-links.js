/* eslint-disable dot-notation */
const fs = require('fs');

const getLinks = (paths) => {
  const result = [];
  paths.forEach((path) => {
    const content = fs.readFileSync(path, 'utf8');
    const links = content.match(/\bhttp(s)?[^)|\s]*/g);

    if (links != null) {
      links.forEach((link) => {
        const item = {
          file: path,
          href: link,
        };
        result.push(item);
      });
    }
  });

  return result;
};

module.exports = getLinks;
