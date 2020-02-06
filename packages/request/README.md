# `@ingresse/request`

#### Facility to use [Fetch API]().


## Usage

#### Install as development dependency:
```
yarn add -D @ingresse/request`
```

#### Usage example
```js
import { get } from '@ingresse/request';

const term = '@ingresse';
const api  = 'https://npmsearch.com/query';

get(api, {
    fields: 'name',
    q     : term,
})
.catch((error) => {
    console.error(`Error on search to NPM Packages with "${term}"`, error);
})
.then((response) => {
    console.log(`NPM Packages results to "${term}"`, response);
});
```
