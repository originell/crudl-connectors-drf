/* globals require, jest, expect, describe, it, beforeEach */
const list = require('../../lib/middleware/list');

const success = res => ({
  create: () => Promise.resolve(res),
  read: () => Promise.resolve(res),
  update: () => Promise.resolve(res),
  delete: () => Promise.resolve(res),
});

const response = {
  status: 200,
  data: {
    total: 24,
    count: 24,
    next: 'http://127.0.0.1:8000/api/entries/?page=2',
    previous: null,
    results: [1, 2, 3],
    deep: {
      result: 'xxx',
    },
  },
};

it('selects correct path', () => {
  const mw = list('results');
  const c = mw(success(response));
  return c.read().then(res => expect(res.data).toEqual([1, 2, 3]));
});

it('handles deep path', () => {
  const mw = list('deep.result');
  const c = mw(success(response));
  return c.read().then(res => expect(res.data).toEqual('xxx'));
});

it('includes pagination', () => {
  const mw = list('results');
  const c = mw(success(response));

  // Set pagination
  response.pagination = {
    type: 'numbered',
  };

  return c.read().then(res => expect(res.data.pagination).toEqual({ type: 'numbered' }));
});
