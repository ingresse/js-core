# `@ingresse/injector` ES Module

#### Utility to make it easy to import 3th party libraries into HTML.


## Usage

#### Install as development dependency:
```
yarn add -D @ingresse/injector`
```

#### Usage examples:
```js
import injector, { css, js } from '@ingresse/injector';

injector({
    tag    : 'script',       // Wrapper element TAG name
    target : 'head',         // Element target - default is 'body'
    id     : 'facebook-sdk', // Wrapper element ID
    content: '//connect.facebook.com/pt_BR/sdk.js', // TAG src
});

injector({
    tag    : 'script', // Wrapper TAG name
    id     : 'gtm',    // Wrapper element ID
    target : 'body',   // Element target - default is 'body'
    content: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','YOUR-GTM-KEY')
    `,
});

js({
    id     : 'gtag',
    target : 'head',
    async  : 1,
    src    : '//www.googletagmanager.com/gtag/js?id=YOUR-GTAG-KEY',
    content: `
        (function(){
            gtag('js', new Date());
            gtag('config', 'YOUR-GTAG-KEY');
            gtag('set', {
                'country': 'BR',
                'currency': 'BRL'
            });
        })()
    `,
});

css({
    id  : 'font-family',
    href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
});
css({
    id     : 'font-family-definition',
    content: `font-family: 'Roboto', sans-serif;`,
});
```
