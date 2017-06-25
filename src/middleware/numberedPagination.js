const expect = require('expect')

function url2page(url, options) {
  const match = new RegExp(`${options.pageQueryParam}=(\\d+)`).exec(url)
  return match ? parseInt(match[1], 10) : 1
}

function getInfo(res, options) {
  // total number of results
  const resultsTotal = res.data.total
  // total number of filtered results
  const filteredTotal = res.data.count

  // next page as number
  const nextPage = res.data.next && url2page(res.data.next, options)
  // previous page as number
  const previousPage = res.data.previous && url2page(res.data.previous, options)
  // the page size
  const pageSize = res.data.results.length

  // compute the currentPage number and the total number of pages
  let currentPage
  let pagesTotal
  if (nextPage) { // We're not on the last page
    currentPage = nextPage - 1
    pagesTotal = filteredTotal / pageSize
  } else { // We're on the last page
    currentPage = previousPage ? previousPage + 1 : 1
    pagesTotal = currentPage
  }

  // Compute all page cursors
  const allPages = []
  for (let i = 0; i < pagesTotal; i += 1) {
    // We return string, so that the page will be preserved in the path query
    allPages[i] = `${(i + 1)}`
  }

  return {
    type: 'numbered',
    allPages,
    currentPage,
    resultsTotal,
    filteredTotal,
  }
}

function checkPagination(response) {
  try {
    expect(response.data).toIncludeKeys(['next', 'previous', 'total', 'count', 'results'])
  } catch (e) {
    throw new Error(`Numbered pagination middleware: Wrong response format. ${e.message}`)
  }
}

function numberedPagination(options = { pageQueryParam: 'page' }) {
  return function numberedPaginationMiddleware(next) {
    return {
      read: req => next.read(req).then((res) => {
        checkPagination(res)
        const paginationDescriptor = getInfo(res, options)
        res.data = res.data.results
        res.data.pagination = paginationDescriptor
        return res
      }),
    }
  }
}

module.exports = numberedPagination
