/* globals require, jest, expect, describe, it */
const buildQuery = require('../../lib/middleware/buildQuery');

function requestTesterConnector(test) {
  return {
    create: req => test(req),
    read: req => test(req),
    update: req => test(req),
    delete: req => test(req),
  };
}

describe('Query building', () => {
  it('uses filters correctly', () => {
    const mw = buildQuery();
    const createRequest = () => ({
      url: 'http://localhost:3000/api/v1/blogs/',
      filters: { user: '1', contains: 'Crudl' },
    });

    const tester = requestTesterConnector(req =>
      expect(req.url).toBe('http://localhost:3000/api/v1/blogs/?user=1&contains=Crudl'),
    );

    mw(tester).create(createRequest());
    mw(tester).read(createRequest());
    mw(tester).update(createRequest());
    mw(tester).delete(createRequest());
  });

  it('uses page correctly', () => {
    const mw = buildQuery();
    const createRequest = () => ({
      url: 'http://localhost:3000/api/v1/blogs/',
      page: '2',
    });

    const tester = requestTesterConnector(req =>
      expect(req.url).toBe('http://localhost:3000/api/v1/blogs/?page=2'),
    );

    mw(tester).create(createRequest());
    mw(tester).read(createRequest());
    mw(tester).update(createRequest());
    mw(tester).delete(createRequest());
  });

  it('uses filters and page correctly', () => {
    const mw = buildQuery();
    const createRequest = () => ({
      url: 'http://localhost:3000/api/v1/blogs/',
      filters: { user: '1', contains: 'Crudl' },
      page: '2',
    });

    const tester = requestTesterConnector(req =>
      expect(req.url).toBe('http://localhost:3000/api/v1/blogs/?user=1&contains=Crudl&page=2'),
    );

    mw(tester).create(createRequest());
    mw(tester).read(createRequest());
    mw(tester).update(createRequest());
    mw(tester).delete(createRequest());
  });
});
