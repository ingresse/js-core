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
    storage,
    parseJWT,

    /**
     * Use API endpoints
     */
    auth,
    company
    event,
    password,
    user,
    users,

    /**
     * Use Microservices Endpoints
     * (FURTHER)
     */
    checkin,
    events,
    tickets,
    shop,

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
    appName   : 'backstage', // help to don't mess with user's session
    company   : 1,
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
.catch((authError) => {
    console.error('Error on Authentication Login', authError);
})
.then((authResponse) => {
    console.info('Success on Authentication Login', authResponse);

    const userId    = authResponse.userId;
    const userQuery = {
        fields: 'id,name,email,pictures',
    };

    user.get(userId, userQuery)
    .catch((userError) => {
        console.error(`Error on fetch User ${userId} data`, userError);
    })
    .then((userResponse) => {
        console.info(`Success on fetch User ${userId} data`, userResponse);
    });
});
```

#### Event

```js
const eventId    = 28724;
const eventQuery = {
    fields: 'id,title,description,poster,venue'
};

event.get(eventId, eventQuery)
.catch((eventError) => {
    console.error(`Error on fetch Event "${eventId}" data`, eventError);
})
.then((eventResponse) => {
    console.info(`Success on fetch Event "${eventId}" data`, eventResponse);
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

const eventId = 28724;

events.get(eventId)
.catch((eventError) => {
    console.error(`Error on fetch Event "${eventId}" data`, eventError);
})
.then((eventResponse) => {
    console.info(`Success on fetch Event "${eventId}" data`, eventResponse);

    const ticketsQuery = {
        type    : 'group',
        pageSize: 5,
    };

    tickets.get(eventId, ticketsQuery)
    .catch((ticketsError) => {
        console.error(`Error on fetch Event ${eventId} Tickets`, ticketsError);
    })
    .then((ticketsResponse) => {
        console.info(`Success on fetch Event ${eventId} Tickets`, ticketsResponse);
    });
});
```

</details>


