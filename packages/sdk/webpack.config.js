/**
 * Webpack Configurations
 */
module.exports = {
    target: 'web',
    mode  : 'production',
    entry : './src/index.js',
    output: {
        globalObject : 'this',
        libraryTarget: 'umd',
        filename     : 'sdk.js',
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
            '@ingresse/request': (__dirname + '/node_modules/@ingresse/request'),
            'dayjs': (__dirname + '/node_modules/dayjs'),
        },
    },
};
