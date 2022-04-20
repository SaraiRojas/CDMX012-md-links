const commandValidation = require('../lib/command-validation');

describe('command-validation', () => {
  test('should return an object with both properties as true', () => {
    const v = '--validate';
    const s = '--stats';
    const options = {
      validate: true,
      stats: true,
    };
    expect(commandValidation(v, s)).toEqual(options);
  });

  test('should return an object with two properties', () => {
    const v = '--validate';
    const s = 'undefined';
    const options = {
      validate: true,
      stats: false,
    };
    expect(commandValidation(v, s)).toEqual(options);
  });

  test('should return an object with two properties', () => {
    const v = '--stats';
    const s = 'undefined';
    const options = {
      validate: false,
      stats: true,
    };
    expect(commandValidation(v, s)).toEqual(options);
  });

  test('should return an object with two properties', () => {
    const v = 'undefined';
    const s = 'undefined';
    const options = {
      validate: false,
      stats: false,
    };
    expect(commandValidation(v, s)).toEqual(options);
  });

  test('should return null', () => {
    const v = '--hello';
    const s = '--stats';
    expect(commandValidation(v, s)).toBe(null);
  });
});
