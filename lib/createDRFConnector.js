'use strict';

var _crudlConnectorsBase = require('@crudlio/crudl-connectors-base');

var _middleware = require('@crudlio/crudl-connectors-base/lib/middleware');

var _middleware2 = require('./middleware');

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDRFConnector(urlPath, opts) {
    if (typeof urlPath !== 'string') {
        throw new Error('URL must be a string, found ' + urlPath + '.');
    }

    var options = Object.assign({}, _defaults2.default, opts);
    var axiosOptions = Object.assign({}, options.axios, { baseURL: options.baseURL });

    var drf = (0, _crudlConnectorsBase.createFrontendConnector)((0, _crudlConnectorsBase.createBackendConnector)(axiosOptions)).use((0, _middleware.crudToHttp)(options.crudToHttp)).use((0, _middleware2.buildQuery)(options.query)).use((0, _middleware.url)(urlPath)).use(_middleware2.crudlErrors);

    return drf;
}

module.exports = createDRFConnector;