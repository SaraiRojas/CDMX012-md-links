const mdLinks = require('./lib/mdlinks');

mdLinks('./docs', true)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
