const getLinks = require('../lib/get-links');

describe('getLinks', () => {
  test('should return an array containing an object with file, href and text', () => {
    const expectedResult = [
      {
        file: './docs/doc-5.md',
        href: 'https://es.wikipedia.org/wiki/Algoritmo_de_Luhn',
        text: 'algoritmo de Luhn',
      },
      {
        file: './docs/doc-5.md',
        href: 'https://www.101computing.net/wp/wp-content/uploads/Luhn-Algorithm.png',
        text: 'gráfica de algoritmo de Luhn',
      },
    ];

    const result = getLinks(['./docs/doc-5.md']);
    expect(result).toEqual(expectedResult);
  });

  test('should return an empty array', () => {
    const expectedResult = [];

    const result = getLinks(['./docs/doc-4.md']);
    expect(result).toEqual(expectedResult);
  });
});
