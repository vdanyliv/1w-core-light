require.config({
    baseUrl: './',
    paths: {
        // Core sub-project
        core: 'js/core',
        app: 'js/core/app',
        jquery: 'js/core/libs/zepto/zepto-loader',
        underscore: 'js/core/libs/underscore-1.6.0',
        backbone: 'js/core/libs/backbone-amd-1.1.0',
        text: 'js/core/libs/requirejs-plugins/text-2.0.12',

        'zepto-core': 'js/core/libs/zepto/zepto-core'
    }
});

require(
    [
        'app'
    ],
    function(App) {
        console.log(App);

        return false;
    }
);