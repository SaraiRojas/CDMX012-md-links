/* eslint-disable no-undef */
const getStats = require('../lib/stats');

describe('command-validation', () => {
  test('should return path provided does not exist', () => {
    const arr = [{
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\moreDocs\\doc-6.md',
      href: 'https://www.youtube.com/watch?v=TRcReyRYIMg',
      text: 'Scrum en menos de 2 minutos',
    },
    {
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\moreDocs\\doc-6.md',
      href: 'https://ww.youtube.ms/',
      text: 'Scrum en Detalle',
    },
    {
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\moreDocs\\moreMoreDocs2\\doc-8.md',
      href: 'https://jestjs.io/es-ok/',
      text: 'Jest',
    },
    {
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\moreDocs\\moreMoreDocs2\\doc-8.md',
      href: 'https://atom.io/',
      text: 'Atom',
    },
    {
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\moreDocs\\moreMoreDocs2\\doc-8.md',
      href: 'https://atom.io/',
      text: 'Atom',
    }];

    const result = { total: 5, unique: 4 };
    expect(getStats(arr, false)).toEqual(result);
  });

  test('should return path provided does not exist', () => {
    const arr = [{
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\moreDocs\\doc-6.md',
      href: 'https://docs.npmjs.com/',
      text: 'Documentación de NPM',
      statusCode: 200,
      statusText: 'OK',
    },
    {
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\moreDocs\\doc-6.md',
      href: 'https://www.youtube.com/watch?v=v3fLx7VHxGM',
      text: 'Metodologías Ágiles',
      statusCode: 400,
      statusText: 'Fail',
    },
    {
      file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\moreDocs\\doc-6.md',
      href: 'https://www.youtube.com/watch?v=TRcReyRYIMg',
      text: 'Scrum en menos de 2 minutos',
      statusCode: 200,
      statusText: 'OK',
    }];

    const result = { total: 3, unique: 3, broken: 1 };
    expect(getStats(arr, true)).toEqual(result);
  });
});
