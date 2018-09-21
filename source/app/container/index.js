/**
 * App constructor
 *
 * @param {Object} options
 */
export default function App(options) {
    if (!(this instanceof App)) return new App(options);

    this.options = $.extend(true, {}, options);
    this.options.me = this;

    App.befores.map(callback => callback.call(this, this));
    this.initModule('page-ready');
}

/**
 * Cache the function that needs to be run before the page is initialized.
 */
App.befores = [];
App.before = callback => App.befores.push(callback);

/**
 * Cache modules.
 */
App.modules = [];
App.use = module => {
    if (Array.isArray(module)) {
        module.map(item => App.use(item));
    } else {
        module.stage = module.stage || 'ready';
        App.modules.push(module);
    }
};

/**
 * Run the specified module.
 */
App.prototype.initModule = function (stage) {
    App.modules.filter(module => module.stage === stage).map(module => {
        module.name ? this[module.name] = module.main : '';
        module.init && typeof module.init == 'function' && module.init.call(module, this);
    });
};
