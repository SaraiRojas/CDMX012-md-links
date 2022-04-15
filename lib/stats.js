const basicStats = (arr) => {
  const totalLinks = arr.length;
  const Unique = new Set(arr.map((item) => item.href)).size;
  return {
    total: totalLinks,
    unique: Unique,
  };
};

module.exports = basicStats;
