define(
    'app',
    [
        'config',
        'core/views/default-view',
        'core/collections/default-collection',
        'core/models/default-model',
        'core/routers/default-router'
    ],
    function(Config, defaultView, defaultCollection, defaultModel, defaultRouter) {
        var App = {
            View: {
                defaultView: defaultView
            },
            Model: {
                defaultModel: defaultModel
            },
            Collection: {
                defaultCollection: defaultCollection
            },
            Router: {
                defaultRouter: defaultRouter
            }
        };

        App.config = Config;

        App.createPage = function(params) {
            var urlArguments = params.urlArguments ? argumentsToArray(params.urlArguments) : null,
                View = params.view || App.View.defaultView,
                cssArr = params.css || [];

            addCss(cssArr);

            $.i18n.properties(function() {
                App.createView(View, {
                    urlArguments: urlArguments,
                    rawTemplates: argumentsToArray(arguments).join('')
                });
            });
        };

        App.createView = function(View, options) {
            var viewExtended = View;

            if (typeof options === 'object') viewExtended = View.extend(options);

            return new viewExtended();
        };

        function addCss(cssArr) {
            if (App.config.environment === 'development') {
                injectCss(cssArr);
            }

            addCssScopes(cssArr);
        }

        function injectCss(cssArr) {
            var head = document.getElementsByTagName('head')[0],
                cssTags = document.createDocumentFragment(),
                index = cssArr.length,
                cssTag;

            while (index--) {
                cssTag = document.createElement('link');
                cssTag.setAttribute('rel', 'stylesheet');
                cssTag.setAttribute('href', 'css/' + cssArr[index] + '.css');
                cssTags.appendChild(cssTag);
            }

            head.appendChild(cssTags);
        }

        function addCssScopes(cssArr) {
            var body = document.getElementsByTagName('body')[0],
                DEFAULT_CLASS_NAMES = 'default';

            body.className = '';
            body.className = DEFAULT_CLASS_NAMES + ' ' + cssArr.join(' ');
        }

        function argumentsToArray(args) {
            return Array.prototype.slice.call(args);
        }

        return App;
    }
);