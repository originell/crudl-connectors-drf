'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = numberedPagination;

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function url2page(url, options) {
    var match = new RegExp(options.pageQueryParam + '=(\\d+)').exec(url);
    return match ? parseInt(match[1], 10) : 1;
}

function getInfo(res, options) {
    // total number of results
    var resultsTotal = res.data.total;
    // total number of filtered results
    var filteredTotal = res.data.count;

    // next page as number
    var nextPage = res.data.next && url2page(res.data.next, options
    // previous page as number
    );var previousPage = res.data.previous && url2page(res.data.previous, options
    // the page size
    );var pageSize = res.data.results.length;

    // compute the currentPage number and the total number of pages
    var currentPage = void 0;
    var pagesTotal = void 0;

    if (nextPage) {
        currentPage = nextPage - 1;
        pagesTotal = filteredTotal / pageSize;
    } else {
        currentPage = previousPage ? previousPage + 1 : 1;
        pagesTotal = currentPage;
    }

    // Compute all page cursors
    var allPages = [];
    for (var i = 0; i < pagesTotal; i += 1) {
        // We return string, so that the page will be preserved in the path query
        allPages[i] = '' + (i + 1);
    }

    return {
        type: 'numbered',
        allPages: allPages,
        currentPage: currentPage,
        resultsTotal: resultsTotal,
        filteredTotal: filteredTotal
    };
}

function checkPagination(response) {
    try {
        (0, _expect2.default)(response.data).toIncludeKeys(['next', 'previous', 'total', 'count', 'results']);
    } catch (e) {
        throw new Error('Numbered pagination middleware: Wrong response format. ' + e.message);
    }
}

function numberedPagination() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { pageQueryParam: 'page' };

    return function numberedPaginationMiddleware(next) {
        return {
            read: function read(req) {
                return next.read(req).then(function (res) {
                    checkPagination(res);
                    var paginationDescriptor = getInfo(res, options);
                    res.data = res.data.results;
                    res.data.pagination = paginationDescriptor;
                    return res;
                });
            }
        };
    };
}