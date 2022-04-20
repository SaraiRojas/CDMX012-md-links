/* eslint-disable no-undef */
const getMdFiles = require('../lib/traverse-dir');

describe('getMdFiles', () => {
  test('should return an array containing markdown files', () => {
    const expectedResult = [
      'docs\\doc-1.md',
      'docs\\doc-4.md',
      'docs\\doc-5.md',
      'docs\\moreDocs\\doc-6.md',
      'docs\\moreDocs\\moreMoreDocs2\\doc-8.md',
    ];

    const result = getMdFiles('./docs');
    expect(result).toEqual(expectedResult);
  });
});
