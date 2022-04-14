const https = require('https');

https.get('https://es.wikipedia.org/wiki/Algoritmo_Luhn', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('status text:', res.statusMessage);
}).on('error', (err) => {
  console.log('Error: ', err.message);
});
