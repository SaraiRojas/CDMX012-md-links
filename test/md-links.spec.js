/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const mock = require('mock-fs');
const mdLinks = require('../md-links');

describe('mdLinks', () => {
  test('should return path provided does not exist', () => {
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

  test('should return path provided does not exist', () => {
    const pat = '../stats';
    const options = null;
    return mdLinks(pat, options).catch((err) => {
      expect(err).toEqual('Wrong command: Valid options\n\n --validate\n --stats\n --validate --stats\n\n');
    });
  });

  test('should return path provided does not exist', () => {
    const pat = undefined;
    const options = null;
    return mdLinks(pat, options).catch((err) => {
      expect(err).toEqual('Please introduce a path\n\n');
    });
  });

  test('should return path provided does not exist', () => {
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
        'index2.html': 'Hello world!!!!!!!!!!!!!!!!',
        folder2: {
          'index3.md': 'Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html) hfgjjyngh',
          'index4.txt': 'Hello world!!!!!!!!!!!!!!!!',
        },
      },
    });
  });

  afterAll(() => {
    mock.restore();
  });

  test('should return path provided does not exist', () => {
    const pat = `${process.cwd()}/folder1`;
    const options = {
      validate: false,
      stats: false,
    };
    const result = [
      {
        file: "C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\folder2\\index3.md",
        href: "https://nodejs.org/docs/latest-v0.10.x/api/modules.html",
        text: "(CommonJS)",
      },
      {
        file: "C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\index1.md",
        href: "https://nodejs.org/docs/latest-v0.10.x/api/modules.html",
        text: "(CommonJS)",
      },
    ];
    return mdLinks(pat, options).then((res) => {
      expect(res).toEqual(result);
    });
  });

  test('should return path provided does not exist', () => {
    const pat = `${process.cwd()}/folder1`;
    const options = {
      validate: false,
      stats: true,
    };
    const result = { total: 2, unique: 1 };
    return mdLinks(pat, options).then((res) => {
      expect(res).toEqual(result);
    });
  });

  test('should return path provided does not exist', () => {
    const pat = `${process.cwd()}/folder1`;
    const options = {
      validate: true,
      stats: true,
    };
    const result = { total: 2, unique: 1, broken: 0 };
    return mdLinks(pat, options).then((res) => {
      expect(res).toEqual(result);
    });
  });

  test('should return path provided does not exist', () => {
    const pat = `${process.cwd()}/folder1`;
    const options = {
      validate: true,
      stats: false,
    };
    const result = [
      {
        file: "C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\folder2\\index3.md",
        href: "https://nodejs.org/docs/latest-v0.10.x/api/modules.html",
        statusCode: 200,
        statusText: "OK",
        text: "(CommonJS)",
      }, {
        file: "C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\index1.md",
        href: "https://nodejs.org/docs/latest-v0.10.x/api/modules.html",
        statusCode: 200,
        statusText: "OK",
        text: "(CommonJS)",
      },
    ];
    return mdLinks(pat, options).then((res) => {
      expect(res).toEqual(result);
    });
  });
});
