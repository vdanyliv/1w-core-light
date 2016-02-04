module.exports = {
    resolve: {
        modulesDirectories: ['./'],
        alias: {
            core: 'js/core',
            app: 'js/core/app',
            jquery: 'js/core/libs/zepto/zepto-loader',
            underscore: 'js/core/libs/underscore-1.6.0',
            backbone: 'js/core/libs/backbone-amd-1.1.0',
            'zepto-core': 'js/core/libs/zepto/zepto-core'
        }
    }
};