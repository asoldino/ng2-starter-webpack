// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = {
    resolve: {
        cache: false,
        extensions: prepend(['.ts', '.js', '.json', '.css', '.html'], '.async') // ensure .async.ts etc also works
    },
    devtool: 'inline-source-map',
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                include: [
                    path.resolve(__dirname, "../../src")
                ]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [
                    path.resolve(__dirname, '../rxjs'),
                    path.resolve(__dirname, '../bootstrap-webpack')
                ]
            }
        ],
        loaders: [
            {
                test: /\.async\.ts$/,
                loaders: ['es6-promise-loader', 'ts-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    "compilerOptions": {
                        "module": "commonjs",
                        "moduleResolution": "node",
                        "target": "es5",
                        "experimentalDecorators": true,
                        "emitDecoratorMetadata": true,

                        "noEmitOnError": true,
                        "removeComments": true,
                    }
                },
                exclude: [/\.e2e\.ts$/]
            },
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.css$/, loader: 'raw-loader'},
            {test: /\.jade/, loader: 'jade'},

            {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
        ],
        postLoaders: [
            // instrument only testing sources with Istanbul
            {
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    /\.e2e\.ts$/,
                    /node_modules/
                ]
            }
        ],

        noParse: [
            root('zone.js/dist'),
            root('angular2/bundles')
        ]
    },
    stats: {colors: true, reasons: true},
    debug: false,
    plugins: [
        new DefinePlugin({
            // Environment helpers
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV)
            }
        }),
        new ProvidePlugin({
            // TypeScript helpers
            '__metadata': 'ts-helper/metadata',
            '__decorate': 'ts-helper/decorate',
            '__awaiter': 'ts-helper/awaiter',
            '__extends': 'ts-helper/extends',
            '__param': 'ts-helper/param',
            'Reflect': 'es7-reflect-metadata/src/global/browser'
        })
    ],
    // we need this due to problems with es6-shim
    node: {
        global: 'window',
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}

function prepend(extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) {
        args = [args]
    }
    return extensions.reduce(function (memo, val) {
        return memo.concat(val, args.map(function (prefix) {
            return prefix + val
        }));
    }, ['']);
}