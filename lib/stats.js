/**
 * Gets stats about the extracted links
 * @param {Array} arr array of objects containing file:, href:, text:, statusCode: and statusText:
 * @param {Object} askValidation object containing two properties with boolean values
 * @returns {Object} Contains information about total number of links, unique links and/or broken links
 */
const getStats = (arr, askValidation) => {
  const totalLinks = arr.length;
  const Unique = new Set(arr.map((item) => item.href)).size;
  if (askValidation) {
    let count = 0;
    arr.forEach((item) => {
      if (item.statusCode !== 200) {
        count += 1;
      }
    });
    return {
      total: totalLinks,
      unique: Unique,
      broken: count,
    };
  }
  return {
    total: totalLinks,
    unique: Unique,
  };
};

module.exports = getStats;
