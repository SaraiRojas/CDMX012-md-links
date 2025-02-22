const fs = require('fs');

/**
 * getLinks function extracts links from from files in an array
 * @param {Array} paths absolute paths of markdown files     
 * @returns {Array} array of objects containing file:, href: and text: 
 */
const getLinks = async (paths) => {
  const result = [];
  // convert async iterator to array link: https://stackoverflow.com/a/64183951
  for (const path of paths) {
    const content = await fs.promises.readFile(path, 'utf8');
    const links = content.match(/\bhttp(s)?[^)|\s]*/g);
    const txt = content.match(/(?<=\[)\S*\bhttp(s)?\S*(?=\))|(?<=\[)\S.*\bhttp(s)?\S*(?=\))|\bhttp(s)?[^)|\s]*/g);

    if (links != null) {
      links.forEach((link, index) => {
        const i = txt[index].indexOf(']');
        const txtLink = txt[index].substring(0, i);
        const item = {
          file: path,
          href: link,
          text: txtLink,
        };
        result.push(item);
      });
    }
  };

  return result;
};

module.exports = getLinks;
