define(
    'core/libs/zepto/src/i18n',
    [
        'core/libs/zepto/src/ajax'
    ],
    function($) {

        function Synchronizer(numberOfThreads, callback) {
            var threadCounter = numberOfThreads;

            return function() {
                var result;

                threadCounter--;

                if (threadCounter < 1) {
                    result = callback.apply(this, arguments)
                }

                return result;
            }
        }

        $.i18n = {};

        $.i18n.map = {};

        $.i18n.properties = function(callback) {
            var settingsWebUI = {
                name:'Messages',
                path: 'http://localhost:6042/app/' + 'languages/',
                mode: 'both',
                language: 'en',
                cache:false
            };

            var defaults = {
                name: 'Messages',
                language: '',
                path: '',
                mode: 'vars',
                cache: false,
                callback: callback
            };

            var settings = _.extend(defaults, settingsWebUI);

            if (settings.language === null || settings.language == '') {
                settings.language = $.i18n.browserLang();
            }
            if (settings.language === null) {
                settings.language = '';
            }

            // load and parse bundle files
            var files = getFiles(settings.name);
            // Default language + current language
            var numberOfLanguages = 2;
            var defaultLanguage, currentLanguage;
            var runCallback = Synchronizer(files.length * numberOfLanguages, function() {
                $.i18n.map = defaultLanguage;
                _.extend($.i18n.map, currentLanguage);
                settings.callback();
            });

            for (var i = 0; i < files.length; i++) {
                loadFile(settings.path + files[i] + '.json', settings, function(data) {
                    defaultLanguage = data;
                    runCallback();
                });
                loadFile(settings.path + files[i] + '_' + settings.language.substring(0, 2) + '.json', settings, function(data) {
                    currentLanguage = data;
                    runCallback();
                });
            }
        };

        $.i18n.prop = function(key /* Add parameters as function arguments as necessary  */) {
            var methodArguments = arguments;
            var parsedStr;
            var value = null;
            var parsedKey = key.split('.');
            var isJSONData = "json" === parsedKey[0];
            if (isJSONData) {
                value = $.i18n.map;
                for (var i = 0; i < parsedKey.length; i++) {
                    value = value[parsedKey[i]];
                }
            }
            else {
                value = $.i18n.map[key];
            }

            if (value == null) {
                parsedStr = '[' + key + ']';
            }
            else if ("string" === typeof value) {
                parsedStr = value.replace(new RegExp('\{([0-9]+?)\}', "gm"), function(comparison, digit) {
                    var digit = parseInt(digit);
                    return (digit + 1 < methodArguments.length) ? methodArguments[digit + 1] : comparison;
                });
            }
            else {
                parsedStr = value;
            }

            return parsedStr;
        };

        /** Language reported by browser, normalized code */
        $.i18n.browserLang = function() {
            return normaliseLanguageCode(navigator.language /* Mozilla */ || navigator.userLanguage /* IE */);
        };

        function loadFile(filename, settings, runCollback) {
            console.error('loadFile');

            $.ajax({
                url: filename,
                cache: settings.cache,
                contentType: "application/json",
                dataType: "json",
                success: function(data, status) {
                    runCollback(data);
                }
            }, {
                clearPreparedDataAfterExtraction: false
            });
        }

        /** Make sure filename is an array */
        function getFiles(names) {
            return (names && names.constructor == Array) ? names : [names];
        }

        /** Ensure language code is in the format aa_AA. */
        function normaliseLanguageCode(lang) {
            lang = lang.toLowerCase();
            if (lang.length > 3) {
                lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
            }
            return lang;
        }

        return $;
    }
);