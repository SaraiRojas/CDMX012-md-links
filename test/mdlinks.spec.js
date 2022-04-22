const mock = require('mock-fs');
const mdLinks = require('../lib/mdlinks');

describe('mdLinks', () => {
  test('should be a function', () => {
    expect(typeof (mdLinks)).toBe('function');
  });

  test('should return path provided does not exist', () => {
    const pat = '../stats';
    const options = {
      validate: false,
      stats: false,
    };
    return mdLinks(pat, options).catch((err) => {
      expect(err).toEqual('Path provided does not exist\n\n');
    });
  });

  test('should return Path provided is not a markdown file', () => {
    const pat = './docs/doc-3.js';
    const options = {
      validate: false,
      stats: false,
    };
    return mdLinks(pat, options).catch((err) => {
      expect(err).toEqual('Path provided is not a markdown file\n\n');
    });
  });
});

describe('mdLinks', () => {
  beforeAll(() => {
    mock({
      folder1: {
        'index1.md': 'Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html) hfgjjyngh',
        'index2.html': '<p>Welcome back<p>',
        folder2: {
          'index3.md': 'El [algoritmo de Luhn](https://es.wikipedia.org/wiki/Algoritmo_de_Luhn),también',
          'index4.txt': 'Hello world!!!!!!!!!!!!!!!!',
        },
      },
    });
  });

  afterAll(() => {
    mock.restore();
  });

  test('should return an array of objects', () => {
    const pat = `${process.cwd()}/folder1`;
    const result = [
      {
        file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\folder2\\index3.md',
        href: 'https://es.wikipedia.org/wiki/Algoritmo_de_Luhn',
        text: 'algoritmo de Luhn',
      },
      {
        file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\index1.md',
        href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
        text: '(CommonJS)',
      },
    ];
    return mdLinks(pat, 'undefined').then((res) => {
      expect(res).toEqual(result);
    });
  });

  test('should return an array of objects', () => {
    const pat = `${process.cwd()}/folder1`;
    const result = [
      {
        file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\folder2\\index3.md',
        href: 'https://es.wikipedia.org/wiki/Algoritmo_de_Luhn',
        statusCode: 200,
        statusText: 'OK',
        text: 'algoritmo de Luhn',
      }, {
        file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\index1.md',
        href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
        statusCode: 200,
        statusText: 'OK',
        text: '(CommonJS)',
      },
    ];
    return mdLinks(pat, true).then((res) => {
      expect(res).toEqual(result);
    });
  });
});
