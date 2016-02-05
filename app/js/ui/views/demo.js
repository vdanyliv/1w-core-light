define(
    'ui/views/demo',
    function (require, module, exports) {
        var App = require('app');
        var tpl = require('text!templates/demo.tpl');

        var Settings = {};
            Settings.autoComplete = require('core/helpers/settings/auto-complete')();
            Settings.bannerTypes = require('core/helpers/settings/banner-types')();

        console.log('Settings', Settings);

        var DemoView = App.View.defaultView.extend({
            el: '#main',
            template: 'tplDemo',
            childs: {},
            initialize: function () {
                var self = this;

                self.resetChilds();
                self.render();
                self.initChilds();
            },
            resetChilds: function () {
                var self = this;

                self.childs = {};
            },
            initChilds: function () {
                var self = this;

                self.childs.child1 = App.createView(Child1, { parent: self });
                self.childs.child2 = App.createView(Child2, { parent: self });
            },
            render: function () {
                var self = this;

                self.templates = self.prepareTpl(tpl);
                self.$el.html(_.template(self.templates[self.template]));
            }
        });

        var Child1 = App.View.defaultView.extend({
            el: '#child1-container',
            template: 'tplChild1',
            initialize: function () {
                var self = this;

                self.render();
            },
            render: function () {
                var self = this;

                self.$el.html(_.template(self.parent.templates[self.template]));
            }
        });

        var Child2 = App.View.defaultView.extend({
            el: '#child2-container',
            template: 'tplChild2',
            initialize: function () {
                var self = this;

                self.render();
            },
            render: function () {
                var self = this;

                self.$el.html(_.template(self.parent.templates[self.template]));
            }
        });

        return DemoView;
    }
);