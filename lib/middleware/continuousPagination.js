'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkPagination(response) {
    try {
        (0, _expect2.default)(response.data).toIncludeKeys(['next', 'total', 'count', 'results']);
    } catch (e) {
        throw new Error('Continuous pagination middleware: Wrong response format. ' + e.message);
    }
}

function url2page(url, options) {
    var match = new RegExp(options.pageQueryParam + '=(\\d+)').exec(url);
    return match ? parseInt(match[1], 10) : 1;
}

function continuousPagination() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { pageQueryParam: 'page' };

    return function continuousPaginationMiddleware(next) {
        return {
            read: function read(req) {
                return next.read(req).then(function (res) {
                    checkPagination(res);
                    var paginationDescriptor = {
                        type: 'continuous',
                        next: res.data.next && url2page(res.data.next, options),
                        resultsTotal: res.data.total,
                        filteredTotal: res.data.count
                    };
                    res.data = res.data.results;
                    res.data.pagination = paginationDescriptor;
                    return res;
                });
            }
        };
    };
}

module.exports = continuousPagination;