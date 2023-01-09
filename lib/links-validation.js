const { default: axios } = require('axios');
/**
 * Validates links through a HTTP request using axios
 * @param {Array} links Array of objects containing file:, href: and text:
 * @returns {Promise} Promise resolve value equal to an array of objects containing file:, href:, text:, statusCode: and statusText: 
 */
const linksValidation = (links) => new Promise((resolve) => {
  const validatedLinks = links.map(async (obj) => {
    try {
      const res = await axios.get(obj.href);
      const data = {
        ...obj,
        statusCode: res.status,
        statusText: res.statusText,
      };
      return data;
    } catch (err) {
      const data = {
        ...obj,
        statusCode: err.response?.status ?? 400,
        statusText: err.message,
      };
      return data;
    }
  });
  resolve(Promise.all(validatedLinks));
});

module.exports = linksValidation;
