export default {
    stage: `page-ready`,
    init(app) {
        window.addEventListener('DOMContentLoaded', event => {
            try {
                const state = $.extend(true, app.options, event.data);
                state.page = $('body').data('page');
                if (typeof state.data === 'string') state.data = $.parseJSON(state.data);
                window.state = app.options = state;
                app.initModule('ready');
                app.options.onReady && app.options.onReady();
            } catch (error) {
                console.error(error);
            }
        }, false);
    },
};
