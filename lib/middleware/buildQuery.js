'use strict';

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _defaults = require('../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildQuery(opts) {
    var options = Object.assign({}, _defaults2.default.buildQuery, opts
    // Builds a new url using the request's url, filters, pagination, and sorting
    );function urlWithQuery(req) {
        if (typeof req.url !== 'string') {
            throw new Error('Request URL must be a string. Found ' + req.url);
        }

        var query = Object.assign({}, req.filters, req.page && _defineProperty({}, options.pageQueryParam, req.page));

        if (req.sorting && req.sorting.length > 0) {
            query[options.orderingParam] = req.sorting.map(function (field) {
                var prefix = field.sorted === 'ascending' ? '' : '-';
                return prefix + field.sortKey;
            }).join(',');
        }

        var parsed = _url2.default.parse(req.url, true);
        parsed.search = undefined;
        parsed.query = Object.assign({}, parsed.query, query);

        return _url2.default.format(parsed);
    }

    return function buildQueryMiddleware(next) {
        return {
            create: function create(req) {
                req.url = urlWithQuery(req);return next.create(req);
            },
            read: function read(req) {
                req.url = urlWithQuery(req);return next.read(req);
            },
            update: function update(req) {
                req.url = urlWithQuery(req);return next.update(req);
            },
            delete: function _delete(req) {
                req.url = urlWithQuery(req);return next.delete(req);
            }
        };
    };
}

module.exports = buildQuery;