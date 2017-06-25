/* globals require, expect, it */
import { createDRFConnector, defaults } from '../src/index'

it('Module exports correctly', () => {
    expect(createDRFConnector).toBeDefined()
    expect(defaults).toBeDefined()
});
