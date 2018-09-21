import '../style/style.scss';
import '../images/logo.jpg';

import App from 'container';
import modules from 'modules/modules';

import Home from 'pages/home';
import Article from 'pages/article';

App.use(modules);

new App({
    routes: {
        home: Home,
        article: Article,
    },
});

hljs.initHighlightingOnLoad();
