
[Django Rest Framework]() connectors for [crudl](https://github.com/crudlio/crudl)

## Installation

```
$npm install --save @crudlio/crudl-connectors-drf
```

## Usage examples

### Simple endpoint connector

```js
const { createDRFConnector } = require('crudl-connectors-drf');
const blogEntries = createDRFConnector('localhost:8080/api/v1/entries');

blogEntries.read().then((entries) => {
	// Do something with the entries
});
```

### Parametrized endpoint connector

```js
const { createDRFConnector } = require('crudl-connectors-drf');
const user = createDRFConnector('localhost:8080/api/v1/users/:username/');

const john = user('john');
const jane = user('jane');

jane.update({ data: { email: 'jane@crudl.io' }});
john.delete();
```

### Setting defaults

```js
const { createDRFConnector, defaults } = require('crudl-connectors-drf');

// Set the default baseURL
defaults.baseURL = 'localhost:8080/api/v1';

const blogEntries = createDRFConnector('entries');
const blogEntry =  createDRFConnector('entries/:id/');
```

### Using pagination

```js
const { createDRFConnector } = require('crudl-connectors-drf');
const { numberedPagination } = require('crudl-connectors-drf/lib/middleware')

const tags = createDRFConnector('localhost:8080/api/v1/tags/').use(numberedPagination());

tags.read().then(results => {
	console.log(results.length); // 20
	console.log(results.pagination); // { type: 'numbered', allPages: [1, 2, 3], currentPage: 1 }
})

tags.read({ page: 2 }).then(results => {
	console.log(results.length); // 20
	console.log(results.pagination); // { type: 'numbered', allPages: [1, 2, 3], currentPage: 2 }
})
```

### Handling Errors

Suppose `handleSubmit` is a [redux-form](http://redux-form.com/) submit handler of a *create user* form.

```js
const { SubmissionError } = require('redux-form');
const { createDRFConnector } = require('crudl-connectors-drf');

const users = createDRFConnector('localhost:8080/api/v1/users/');

function handleSubmit(data) {
	return users.create({ data })
	.catch((error) => {
		if (error.validationError) {
			throw new SubmissionError(error.errors)
		}
		if (error.authorizationError) {
			// Redirect to login
		}
		if (error.permissionError) {
			// Display warning
		}
	})
}
```
