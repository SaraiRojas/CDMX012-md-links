/**
 * Returns an object containing boolean values
 * @param {String} validation value provided via CLI
 * @param {String} stats value provided via CLI
 * @returns {object | null} object containing boolean values or null
 */
const commandValidation = (validation, stats) => {
  switch (`${validation}|${stats}`) {
    case '--validate|undefined':
      return {
        validate: true,
        stats: false,
      };
    case '--stats|undefined':
      return {
        validate: false,
        stats: true,
      };
    case 'undefined|undefined':
      return {
        validate: false,
        stats: false,
      };
    case '--validate|--stats':
      return {
        validate: true,
        stats: true,
      };
    default:
      return null;
  }
};

module.exports = commandValidation;
