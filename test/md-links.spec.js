/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const mdLinks = require('../md-links');

describe('mdLinks', () => {
  const pat = '../stats';
  const options = {
    validate: false,
    stats: false,
  };

  test('should return path provided does not exist', () => {
    expect(typeof (mdLinks)).toBe('function');
  });

  test('should return path provided does not exist', () => {
    return mdLinks(pat, options).then((res) => {
      expect(res).toEqual('Path provided does not exist');
    });
  });
});
