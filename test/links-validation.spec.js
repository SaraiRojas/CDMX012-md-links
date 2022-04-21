const axios = require('axios');
const linksValidation = require('../lib/links-validation');

jest.mock('axios');

describe('linksValidation', () => {
  test('should return an array containing an object with file, href, text, statusCode and statusText', () => {
    const paths = [{
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\doc-1.md',
      href: 'https://docs.npmjs.com/issue',
      text: 'npmjs',
    },
    {
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\doc-5.md',
      href: 'https://es.wikipedia.org/wiki/Algoritmo_de_Luhn',
      text: 'algoritmo de Luhn',
    }];

    const result = [{
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\doc-1.md',
      href: 'https://docs.npmjs.com/issue',
      text: 'npmjs',
      statusCode: 200,
      statusText: 'OK',
    },
    {
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\doc-5.md',
      href: 'https://es.wikipedia.org/wiki/Algoritmo_de_Luhn',
      text: 'algoritmo de Luhn',
      statusCode: 200,
      statusText: 'OK',
    }];

    axios.get.mockImplementation(() => Promise.resolve({ status: 200, statusText: 'OK' }));

    return linksValidation(paths).then((res) => {
      expect(res).toEqual(result);
    });
  });
});
