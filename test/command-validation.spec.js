/* eslint-disable no-undef */
const commandValidation = require('../lib/command-validation');

describe('command-validation', () => {
  test('should return path provided does not exist', () => {
    const v = '--validate';
    const s = '--stats';
    const options = {
      validate: true,
      stats: true,
    };
    expect(commandValidation(v, s)).toEqual(options);
  });

  test('should return path provided does not exist', () => {
    const v = '--validate';
    const s = 'undefined';
    const options = {
      validate: true,
      stats: false,
    };
    expect(commandValidation(v, s)).toEqual(options);
  });

  test('should return path provided does not exist', () => {
    const v = '--stats';
    const s = 'undefined';
    const options = {
      validate: false,
      stats: true,
    };
    expect(commandValidation(v, s)).toEqual(options);
  });

  test('should return path provided does not exist', () => {
    const v = 'undefined';
    const s = 'undefined';
    const options = {
      validate: false,
      stats: false,
    };
    expect(commandValidation(v, s)).toEqual(options);
  });

  test('should return path provided does not exist', () => {
    const v = '--hello';
    const s = '--stats';
    expect(commandValidation(v, s)).toBe(null);
  });
});
