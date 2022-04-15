const { default: axios } = require('axios');
// const https = require('https');

// https.get('https://docs.npmjs.com/files/package.json', (res) => {
//   console.log('Status Code:', res.statusCode);
//   console.log('status text:', res.statusMessage);
// }).on('error', (err) => {
//   console.log('Error: ', err.message);
// });

// axios.get('https://docs.npmjs.com/files/package.json')
//   .then((res) => {
//     console.log('Status Code:', res.status);
//     console.log('status text:', res.statusText);
//   });

// const paths = [{
//   file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\doc-1.md',
//   href: 'https://docs.npmjs.com/files/package.json',
//   text: 'npmjs',
// },
// {
//   file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\doc-5.md',
//   href: 'https://es.wikipedia.org/wiki/Algoritmo_de_Luhn',
//   text: 'algoritmo de Luhn',
// }];

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
      });
  });
  resolve(Promise.all(validatedLinks));
});

// linksValidation(paths)
//   .then((res) => {
//     console.log(res);
//   });

module.exports = linksValidation;

  
