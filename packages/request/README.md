# `@ingresse/request` ES Module

#### Facility to use [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).


## Usage

#### Install as development dependency:
```
yarn add -D @ingresse/request
```

#### Example
```js
import { get } from '@ingresse/request';

const term = 'ingresse';
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
