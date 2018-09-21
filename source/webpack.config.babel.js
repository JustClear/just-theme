import webpack from 'webpack';
import path from 'path';
import extractText from 'extract-text-webpack-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import Copy from 'copy-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';
const PATH_DIST = path.join(__dirname, './dist');

const configure = {
    mode: isDev ? 'development' : 'production',
    entry: {
        'app': ['./app/app.js'],
    },
    output: {
        path: PATH_DIST,
        publicPath: isDev ? '' : './dist/',
        filename: 'js/[name].js?[hash:8]', // output file name
    },
    module: {
        rules: [{
            test: /\.(js|es6)$/,
            type: 'javascript/auto',
            use: ['babel-loader'],
            exclude: /node_modules\/lodash/,
        }, {
            test: /\.(scss|css)$/,
            type: 'javascript/auto',
            use: extractText.extract({
                publicPath: '../',
                fallback: `style-loader`,
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader?outputStyle=expanded',
                ],
            }),
        }, {
            test: /\.(mp3|mp4)$/,
            type: 'javascript/auto',
            use: [{
                loader: `url-loader`,
                options: {
                    limit: 5120,
                    name: `[path][name].[ext]?[hash:8]`,
                },
            }],
        }, {
            test: /\.(woff|ttf|eot)$/,
            type: 'javascript/auto',
            use: [{
                loader: `url-loader`,
                options: {
                    limit: 5120,
                    name: `[path][name].[ext]?[hash:8]`,
                },
            }],
        }, {
            test: /\.(svg|gif|jpg|jpeg|png)$/,
            type: 'javascript/auto',
            use: [{
                loader: `url-loader`,
                options: {
                    limit: 1,
                    name: `[path][name].[ext]?[hash:8]`,
                },
            }],
        }, {
            test: /\.json$/,
            type: 'javascript/auto',
            use: ['json-loader'],
        }],
    },
    resolve: {
        extensions: ['.js', '.es6', '.scss', '.css'],
        alias: {
            app: path.resolve(__dirname, `./app/`),
            pages: path.resolve(__dirname, `./app/pages/`),
            common: path.resolve(__dirname, `./app/common/`),
            modules: path.resolve(__dirname, `./app/modules/`),
            container: path.resolve(__dirname, `./app/container/`),
        },
    },
    plugins: [
        new Copy([{
            from: './app/common/highlight.pack.js',
            to: './js/highlight.pack.js',
            toType: 'file',
        }, {
            from: './app/common/zepto.min.js',
            to: './js/zepto.min.js',
            toType: 'file',
        }]),
        new extractText('css/app.css?[hash:8]', {
            allChunks: true,
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
};

if (!isDev) configure.plugins.push(new MinifyPlugin());

module.exports = configure;
