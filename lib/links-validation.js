const { default: axios } = require('axios');

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
