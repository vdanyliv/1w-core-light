'use strict';

var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
    entry: {
        ui: './app/js/ui/main-ui.js'
    },
    output: {
        path: __dirname + 'dist/js',
        filename: 'ui.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],
    resolve: {
        modulesDirectories: ['./'],
        alias: {
            // Core sub-project
            core: 'js/core',
            app: 'js/core/app',
            config: 'js/core/config',
            jquery: 'js/core/libs/zepto/zepto-loader',
            underscore: 'js/core/libs/underscore-1.6.0',
            backbone: 'js/core/libs/backbone-amd-1.1.0',
            'zepto-core': 'js/core/libs/zepto/zepto-core',
            // UI sub-project
            ui: 'js/ui',
            backgrid: 'js/ui/libs/backbone-plugins/backgrid'
        }
    },
    resolveLoader: {
        alias: {
            text: 'raw-loader'
        }
    }
};