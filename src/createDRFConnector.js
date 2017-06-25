const { createFrontendConnector, createBackendConnector } = require('@crudlio/crudl-connectors-base')
const { crudToHttp, url } = require('@crudlio/crudl-connectors-base/lib/middleware')

const { buildQuery, crudlErrors } = require('./middleware')
const defaults = require('./defaults')

function createDRFConnector(urlPath, opts) {
    if (typeof urlPath !== 'string') {
        throw new Error(`URL must be a string, found ${urlPath}.`)
    }

    const options = Object.assign({}, defaults, opts)
    const axiosOptions = Object.assign({}, options.axios, { baseURL: options.baseURL })

    const drf = createFrontendConnector(createBackendConnector(axiosOptions))
    .use(crudToHttp(options.crudToHttp))
    .use(buildQuery(options.query))
    .use(url(urlPath))
    .use(crudlErrors)

    return drf
}

module.exports = createDRFConnector
