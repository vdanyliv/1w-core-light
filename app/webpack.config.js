module.exports = {
    resolve: {
        modulesDirectories: ['./'],
        alias: {
            // Core sub-project
            core: 'js/core',
            app: 'js/core/app',
            jquery: 'js/core/libs/zepto/zepto-loader',
            underscore: 'js/core/libs/underscore-1.6.0',
            backbone: 'js/core/libs/backbone-amd-1.1.0',
            'zepto-core': 'js/core/libs/zepto/zepto-core',
            // UI sub-project
            ui: 'js/ui',
            backgrid: 'js/ui/libs/backbone-plugins/backgrid',
            text: 'node_modules/raw-loader/index'
        }
    }
};