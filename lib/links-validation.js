const { default: axios } = require('axios');
/**
 * Validates links through a HTTP request using axios
 * @param {Array} links Array of objects containing file:, href: and text:
 * @returns {Promise} Promise resolve value equal to an array of objects containing file:, href:, text:, statusCode: and statusText: 
 */
const linksValidation = (links) => new Promise((resolve, reject) => {
  const validatedLinks = links.map((obj) => {
    return axios.get(obj.href)
      .then((res) => {
          const object = {
              ...obj,
              statusCode: res.status,
              statusText: res.statusText,
          }
          return object
      })
      .catch((err) => {
          const object = {
             ...obj,
             statusCode: 400,
             statusText: err.message,
          }
          return object
      })
  });
  resolve(Promise.all(validatedLinks));
});

module.exports = linksValidation;
