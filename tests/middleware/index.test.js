/* globals require, expect, it */
import { buildQuery, crudlErrors, continuousPagination, numberedPagination } from '../../src/middleware/index'

it('Module exports correctly', () => {
    expect(buildQuery).toBeDefined()
    expect(crudlErrors).toBeDefined()
    expect(continuousPagination).toBeDefined()
    expect(numberedPagination).toBeDefined()
});
