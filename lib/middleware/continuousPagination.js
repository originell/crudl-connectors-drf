const expect = require('expect');

function checkPagination(response) {
  try {
    expect(response.data).toIncludeKeys(['next', 'total', 'count', 'results']);
  } catch (e) {
    throw new Error(`Continuous pagination middleware: Wrong response format. ${e.message}`);
  }
}

function url2page(url, options) {
  const match = new RegExp(`${options.pageQueryParam}=(\\d+)`).exec(url);
  return match ? parseInt(match[1], 10) : 1;
}

function continuousPagination(options = { pageQueryParam: 'page' }) {
  return function continuousPaginationMiddleware(next) {
    return {
      read: req => next.read(req).then((res) => {
        checkPagination(res);
        res.pagination = {
          type: 'continuous',
          next: res.data.next && url2page(res.data.next, options),
          resultsTotal: res.data.total,
          filteredTotal: res.data.count,
        };
        return res;
      }),
    };
  };
}

module.exports = continuousPagination;
