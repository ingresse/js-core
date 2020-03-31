/**
 * Webpack Configurations
 */
module.exports = {
    target: 'web',
    mode  : 'production',
    entry : './src/browser.js',
    output: {
        libraryTarget: 'umd',
        filename     : 'trackers.js',
        path         : (__dirname + '/dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use : {
                    loader : 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            '@ingresse/injector': (__dirname + '/node_modules/@ingresse/injector'),
        },
    },
};
