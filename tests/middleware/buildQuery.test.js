/* globals require, jest, expect, describe, it */
const buildQuery = require('../../src/middleware/buildQuery');

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

  it('uses sorting correctly', () => {
    const mw = buildQuery({ orderingParam: 'sort' });
    const createRequest = () => ({
      url: 'http://localhost:3000/api/v1/blogs/',
      sorting: [
        {
          name: 'section',
          sorted: 'descending',
          sortKey: 'section',
        },
        {
          name: 'name',
          sorted: 'ascending',
          sortKey: 'slug',
        },
      ],
    });

    const tester = requestTesterConnector(req =>
      expect(req.url).toBe(`http://localhost:3000/api/v1/blogs/?sort=${encodeURIComponent('-section,slug')}`),
    );

    mw(tester).create(createRequest());
    mw(tester).read(createRequest());
    mw(tester).update(createRequest());
    mw(tester).delete(createRequest());
  });

  it('uses filters, page, and sorting correctly', () => {
    const mw = buildQuery({ pageQueryParam: 'p', orderingParam: 'o' });
    const createRequest = () => ({
      url: 'http://localhost:3000/api/v1/blogs/',
      filters: { u: '1', c: 'Crudl' },
      page: '2',
      sorting: [
        {
          name: 'section',
          sorted: 'descending',
          sortKey: 'section',
        },
        {
          name: 'name',
          sorted: 'ascending',
          sortKey: 'slug',
        },
      ],
    });

    const tester = requestTesterConnector(req =>
      expect(req.url).toBe(
        `http://localhost:3000/api/v1/blogs/?u=1&c=Crudl&p=2&o=${encodeURIComponent('-section,slug')}`,
      ),
    );

    mw(tester).create(createRequest());
    mw(tester).read(createRequest());
    mw(tester).update(createRequest());
    mw(tester).delete(createRequest());
  });
});
