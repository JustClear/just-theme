import global from 'pages/global';

export default {
    init(app) {
        const routes = app.options.routes;
        const routeName = app.options.page;
        const route = routes[routeName];

        global.call(app, app);

        if (route) {
            route.call(app, app);
        } else {
            console.log('route not found.');
        }
    },
};
