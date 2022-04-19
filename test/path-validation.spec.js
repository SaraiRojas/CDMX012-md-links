/* eslint-disable no-undef */
const doesPathExist = require('../lib/path-validation');

describe('modifyFile script', () => {
  test('should return an array containing an object with file, href, text, statusCode and statusText', () => {
    const inputPath = '../docs';
    expect(doesPathExist(inputPath)).toBeFalsy();
  });

  test('should return an array containing an object with file, href, text, statusCode and statusText', () => {
    const inputPath = './docs';
    expect(doesPathExist(inputPath)).toBeTruthy();
  });
});
