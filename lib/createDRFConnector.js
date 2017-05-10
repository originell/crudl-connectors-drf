const { createFrontendConnector, createBackendConnector } = require('crudl-connectors-base');
const { crudToHttp, patternedURL } = require('crudl-connectors-base/lib/middleware');

const { buildQuery, crudlErrors } = require('./middleware');
const defaults = require('./defaults');

function createDRFConnector(url, opts) {
  if (typeof url !== 'string') {
    throw new Error(`URL must be a string, found ${url}.`);
  }

  const options = Object.assign({}, defaults, opts);
  const axiosOptions = Object.assign({}, options.axios, { baseURL: options.baseURL });

  const drf = createFrontendConnector(createBackendConnector(axiosOptions))
    .use(crudToHttp(options.crudToHttp))
    .use(buildQuery(options.query))
    .use(patternedURL(url))
    .use(crudlErrors);

  return drf;
}

module.exports = createDRFConnector;
