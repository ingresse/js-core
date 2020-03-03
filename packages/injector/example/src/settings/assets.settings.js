/**
 * Assets Settings
 */
export const assets = {
    css: {
        href : 'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap',
        style:
`
html, body, button, input, textarea {
    font-family: "Roboto", sans-serif;
}
`
    },

    js: {
        src: 'https://cdn.ingresse.com/auth/auth.min.js',
        snippet:
`
(function() {
    var message = 'Injector Snippet result: ';

    try {
        alert(message + Authing);
    } catch (error) {
        alert(message + error);
    }
})()
`
    },
};
