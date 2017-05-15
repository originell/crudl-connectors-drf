
const defaults = {

  // A string (e.g. 'localhost:3000/api/v2/')
  baseURL: '',

  // The name of the query parameter (page_query_param of DRF)
  buildQuery: {
    pageQueryParam: 'page',
    orderingParam: 'ordering',
  },

  // How are the crud methods mapped to http methods
  crudToHttp: {
    create: 'post',
    read: 'get',
    update: 'patch',
    delete: 'delete',
  },

  // Default settings for axios
  axios: {
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
  },

};

module.exports = defaults;
