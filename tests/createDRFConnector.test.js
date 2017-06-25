/* globals require, jest, expect, describe, it */
const createDRFConnector = require('../src/createDRFConnector');

it('builds the connector', () => {
    const c = createDRFConnector('/api/v1/test/');

    expect(c).toHaveProperty('create');
    expect(c).toHaveProperty('read');
    expect(c).toHaveProperty('create');
    expect(c).toHaveProperty('delete');
    expect(c).toHaveProperty('use');
});

it('requires url path', () => {
    expect(() => createDRFConnector()).toThrow();
});
