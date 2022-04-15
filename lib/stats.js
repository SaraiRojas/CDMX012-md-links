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
