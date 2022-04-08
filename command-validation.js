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
      return 'Wrong command';
  }
};

module.exports = commandValidation;
