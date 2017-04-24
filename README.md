## Usage

```js
const { createDRFConnector, defaults } = require('crudl-connectors-drf');

// Set the default baseURL
defaults.baseURL = 'localhost:8080/django-api/';

// Create some general connectors
let collection = createDRFConnector('/:collection/');
let detail = createDRFConnector('/:collection/:id/');

collection('blogs').read(); // [ {id: 1, title: 'Middleware connectors'}, { id: 2, title: 'About crudl' }, ...]
detail('blogs', 1).read(); // { id: 1, title: 'Middleware connectors' }
detail('blogs', 1).update({ data: { title: 'How to write middleware' } });

// Create some specific connectors
let staffUsers = createDRFConnector('/users?staff=1');
```
