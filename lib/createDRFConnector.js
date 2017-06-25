'use strict';

var _require = require('@crudlio/crudl-connectors-base'),
    createFrontendConnector = _require.createFrontendConnector,
    createBackendConnector = _require.createBackendConnector;

var _require2 = require('@crudlio/crudl-connectors-base/lib/middleware'),
    crudToHttp = _require2.crudToHttp,
    url = _require2.url;

var _require3 = require('./middleware'),
    buildQuery = _require3.buildQuery,
    crudlErrors = _require3.crudlErrors;

var defaults = require('./defaults');

function createDRFConnector(urlPath, opts) {
  if (typeof urlPath !== 'string') {
    throw new Error('URL must be a string, found ' + urlPath + '.');
  }

  var options = Object.assign({}, defaults, opts);
  var axiosOptions = Object.assign({}, options.axios, { baseURL: options.baseURL });

  var drf = createFrontendConnector(createBackendConnector(axiosOptions)).use(crudToHttp(options.crudToHttp)).use(buildQuery(options.query)).use(url(urlPath)).use(crudlErrors);

  return drf;
}

module.exports = createDRFConnector;