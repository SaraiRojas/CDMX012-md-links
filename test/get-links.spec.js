/* eslint-disable no-undef */
const mock = require('mock-fs');
const getLinks = require('../lib/get-links');

describe('modifyFile script', () => {
  beforeAll(() => {
    mock({
      folderName: {
        'index.md': 'Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html) hfgjjyngh',
        'index2.md': 'Hello world!!!!!!!!!!!!!!!!',
      },
    });
  });

  afterAll(() => {
    mock.restore();
  });

  test('should return an array containing an object with file, href and text', () => {
    const file = `${process.cwd()}/folderName/index.md`;
    const expectedResult = [{
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links/folderName/index.md',
      href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
      text: '(CommonJS)',
    }];

    const result = getLinks([file]);
    expect(result).toEqual(expectedResult);
  });

  test('should return an empty array', () => {
    const file = `${process.cwd()}/folderName/index2.md`;
    const expectedResult = [];

    const result = getLinks([file]);
    expect(result).toEqual(expectedResult);
  });
});
