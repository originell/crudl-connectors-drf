import { createFrontendConnector, createBackendConnector } from '@crudlio/crudl-connectors-base'
import { crudToHttp, url } from '@crudlio/crudl-connectors-base/lib/middleware'

import { buildQuery, crudlErrors } from './middleware'
import defaults from './defaults'

export default function createDRFConnector(urlPath, opts) {
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
