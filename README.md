## Usage

```js
const { createDRFConnector, defaults } = require('crudl-connectors-drf');
const { list } = require('crudl-connectors-drf/lib/middleware');

// Set the default baseURL
defaults.baseURL = 'localhost:8080/django-api/';

// Create some general connectors
let list = createDRFConnector('/:collection/')).use(list('results'));
let instance = createDRFConnector('/:collection/:id/');

list('blogs').read(); // [ {id: 1, title: 'Middleware connectors'}, { id: 2, title: 'About crudl' }, ...]
instance('blogs', 1).read(); // { id: 1, title: 'Middleware connectors' }
instance('blogs', 1).update({ data: { title: 'How to write middleware' } });

// Create some specific connectors
let staffUsers = createDRFConnector('/users?staff=1');
```
