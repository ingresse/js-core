# `@ingresse/trackers`

### Facility to inject 3rd party services as [Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel), [Google Analytics](https://developers.google.com/gtagjs/reference/api) and [Legiti](https://docs.legiti.com/ticketing-api/frontend-collection-sdks) inside your HTML page.


## [npm](https://www.npmjs.com/package/@ingresse/trackers) install
```shell
npm i -S @ingresse/trackers
```
Will install [@ingresse/injector](https://www.npmjs.com/package/@ingresse/injector) as dependency. If you need, you can use it too.

## Browser
```html
<html>
    <head>
        <script>
            // This isn't required, but it's a way to use
            function onTrackersLoad() {
                console.log('trackers can be used now', window.trackers);

                // Look into #usage section below
            }
        </script>
        <script onload="onTrackersLoad()" src="https://cdn.ingresse.com/trackers/trackers.js"></script>
    </head>
    <body>
        ...
    </body>
</html>
```

## Usage
Service without ID/Key will not be injected.
You can use only what you need.

```js
// Only ES Apps
import trackers from '@ingresse/trackers';

// General Usage
trackers({
    fbq   : 'facebook-pixel-id',
    gtag  : 'google-analytics-id',
    legiti: 'legiti-api-key',
})
.then(() => {
    // Generic
    trackers.pageView();

    // Auth
    trackers.auth.login('user@email.io', 'user-id');
    trackers.auth.logout('user@email.io', 'user-id');
    trackers.auth.register('user@email.io', 'user-id');

    // User
    trackers.user.created('user@email.io' 'user-id');
    trackers.user.updated('user-id');

    // Cart
    trackers.cart.add({
        tid: 'transaction-id',

        value   : 30,
        currency: 'BRL',

        items: [
            {
                id      : 123,
                quantity: 2,
            },
            {
                id      : 321,
                quantity: 1,
            },
        ],
    });

    // Conversion
    trackers.purchase.created({
        tid: 'transaction-id',

        value   : 30,
        currency: 'BRL',

        items: [
            {
                id      : 123,
                quantity: 2,
            },
            {
                id      : 321,
                quantity: 1,
            },
        ],
    });
    trackers.purchase.success({
        tid: 'transaction-id',

        value   : 30,
        tax     : 3,
        coupon  : 'discount-coupon-used-if-existent',
        currency: 'BRL',

        items: [
            {
                id      : 123,
                quantity: 2,
            },
            {
                id      : 321,
                quantity: 1,
            },
        ],
    });

    // Simplified Usage
    trackers.fbq('track', 'AddToCart', { ... });
    trackers.gtag('event', 'an awesome action', { ... });
    trackers.legiti('trackUserLogin', 'user@email.io', 'user-id');

    // Root Usage
    window.fbq('track', 'AddToCart', { ... });
    window.gtag('event', 'an awesome action', { ... });
    window.legiti.sharedInstance().trackUserLogin('user@email.io', 'user-id');
})
.catch((error) => {
    console.warn('Trackers Injection failed', error);
});
```

## More usage details
Our code is written to be easy to read and understand.
Be comfortable to navigate into `src` folder and discover.
Folder `src/methods` may help to find some pre-existing method.
