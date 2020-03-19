# `@ingresse/sdk` ES Module

#### Facility to use [Ingresse's API](https://dev.ingresse.com/).


## Usage

#### Install as development dependency:
```
yarn add -D @ingresse/sdk
```

#### Example
```js
import SDK, {
    /**
     * Tools
     */
    credentials,
    options,

    /**
     * Extras
     */
    cookies,
    request,
    storage,
    parseJWT,

    /**
     * Use API endpoints
     */
    auth,
    company,
    entrance,
    event,
    password,
    sales,
    user,
    users,

    /**
     * Use Microservices Endpoints
     */
    checkin,
    coupons,
    events,
    shop,
    tickets,

    /**
     * Lambdas as Subdomains
     */
    purchases, // consume 'https://my-transactions.ingresse.com' without env support
    score,     // consume 'https://beta-score.ingresse.com' without env support
} from '@ingresse/sdk';

/**
 * Initialize
 */
SDK({
    /**
     * Required
     */
    apiKey: 'your-api-key',

    /**
     * Optionals
     */
    company   : 1,
    appName   : 'backoffice', // help to don't mess with user's session
    locale    : 'pt-br',
    env       : 'integration',
    exceptions: {
        '6061': 'Não foi possível autenticar o usuário.',
    },

    /**
     * Optionals Lambdas Keys
     */
    purchasesKey: 'your-purchases-lambda-x-api-key',
    scoreKey    : 'your-score-lambda-basic-authorization-key',
});
```

---

<details>
<summary>
    APIs Usage Examples
</summary>

#### Auth/User

```js
const userEmail    = 'john@doe.io';
const userPassword = 'user-password';

auth.login(userEmail, userPassword)
.then((authResponse) => {
    console.info('Success on Authentication Login', authResponse);

    const userId    = authResponse.userId;
    const userQuery = {
        fields: 'id,name,email,pictures',
    };

    user.get(userId, userQuery)
    .then((userResponse) => {
        console.info(`Success on fetch User ${userId} data`, userResponse);
    })
    .catch((userError) => {
        console.error(`Error on fetch User ${userId} data`, userError);
    });
})
.catch((authError) => {
    console.error('Error on Authentication Login', authError);
});
```

#### Event

```js
const eventId    = 00000;
const eventQuery = {
    fields: 'id,title,description,poster,venue'
};

event.get(eventId, eventQuery)
.then((eventResponse) => {
    console.info(`Success on fetch Event "${eventId}" data`, eventResponse);
})
.catch((eventError) => {
    console.error(`Error on fetch Event "${eventId}" data`, eventError);
});
```

</details>

---

<details>
<summary>
    Microservices Usage Examples
</summary>

#### Event

```js
// API          Event GET = public  (anyone can access data)
// Microservice Event GET = private (only with login and specifics permissions)

const eventId = 000000;

events.get(eventId)
.then((eventResponse) => {
    console.info(`Success on fetch Event "${eventId}" data`, eventResponse);

    const ticketsQuery = {
        type    : 'group',
        pageSize: 5,
    };

    tickets.get(eventId, ticketsQuery)
    .then((ticketsResponse) => {
        console.info(`Success on fetch Event ${eventId} Tickets`, ticketsResponse);
    })
    .catch((ticketsError) => {
        console.error(`Error on fetch Event ${eventId} Tickets`, ticketsError);
    });
})
.catch((eventError) => {
    console.error(`Error on fetch Event "${eventId}" data`, eventError);
});
```

</details>

---

<details>
<summary>
    Endpoints Not Covered by SDK
</summary>

#### Scenary

In order to many cool-weekly launched features, we can't maitain the SDK updated with all of Ingresse's existent endpoints.
So, in case you are looking for some method to a certain endpoint and you can't find it in our most-recent SDK release, this extra resource can help.

#### Generic Request

As you may already familiar with [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), you can use this similar resource to make generic requests to Ingresse's API:

#### API enpoints

This example will try to execute a HTTP POST to `https://api.ingresse.com/not-covered-endpoint/subpath-if-needed`, passing some query string parameters and body data.
(It's just an example, will intentionally fails).

Use this example base to every endpoint over `api.ingresse.com`.

```js
import { request } from '@ingresse/sdk';

const endpoint = '/not-covered-endpoint/subpath-if-needed';
const settings = {
    method: 'POST',
    query : {
        term: 'no need to use encoders, the SDK do this for you',
    },
    body: {
        title: 'Example, yo!',
    },
};

request(endpoint, settings)
.then((response) => {
    console.info(`Fetched response from uncovered endpoint "${endpoint}"`, response);
})
.catch((error) => {
    console.error(`Error on fetch uncovered endpoint "${endpoint}"`, error);
});
```

#### Microservices and Lambdas enpoints

| Microservice | Subdomain              |
| ------------ | ---------------------- |
| checkin      | `checkin.ingresse.com` |
| coupons      | `coupon.ingresse.com`  |
| events       | `event.ingresse.com`   |
| shop         | `shop.ingresse.com`    |
| tickets      | `ticket.ingresse.com`  |

| Lambda    | Subdomain                      |
| ----------| ------------------------------ |
| finance   | `finance.ingresse.com`         |
| purchases | `my-transactions.ingresse.com` |
| score     | `beta-score.ingresse.com`      |

This examples will try to execute a HTTP GET in some of Ingresse's Microservices endpoints.
(Will intentionally fails).

**Use this example base to every endpoint over everyelse subdomain of** `.ingresse.com`.

```js
import {
    checkin,   // MS
    purchases, // Lambda
} from '@ingresse/sdk';

const endpoint = '/not-covered-endpoint/subpath-if-needed';
const settings = {
    query: {
        session_id: '54321',
    },
};

// Checkin MS (checkin.ingresse.com)
checkin.request(endpoint, settings)
.then((response) => {
    console.info(`Checkin MS: Fetched response from uncovered endpoint "${endpoint}"`, response);
})
.catch((error) => {
    console.error(`Checkin MS: Error on fetch uncovered endpoint "${endpoint}"`, error);
});

// Purchases Lambda (my-transactions.ingresse.com)
purchases.request(endpoint, settings)
.then((response) => {
    console.info(`Events MS: Fetched response from uncovered endpoint "${endpoint}"`, response);
})
.catch((error) => {
    console.error(`Events MS: Error on fetch uncovered endpoint "${endpoint}"`, error);
});
```
</details>


