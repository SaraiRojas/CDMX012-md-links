/* eslint-disable no-undef */
const mock = require('mock-fs');
const getMdFiles = require('../lib/traverse-dir');

describe('modifyFile script', () => {
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

  test('should return an array containing an object with file, href and text', () => {
    const dir = `${process.cwd()}/folder1/`;
    const expectedResult = ['C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\folder2\\index3.md', 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\folder1\\index1.md'];

    const result = getMdFiles(dir);
    expect(result).toEqual(expectedResult);
  });
});
