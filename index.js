const mdLinks = require('./lib/mdlinks');

mdLinks('./doc', true)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });
