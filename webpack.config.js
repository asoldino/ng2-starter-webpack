var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    devtool: 'source-map',
    cache: true,
    debug: true,

    entry: {
        app: './src/index.ts',
        vendor: './src/vendor.ts'
    },
    output: {
        path: 'dist',
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        pathinfo: true
    },

    plugins: [
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        //new CommonsChunkPlugin({name: 'common', filname: 'common.js', minChunks: 2, chunks:['app', 'vendor']}),
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html',
            inject: 'body',

            title: 'Project'
        })
    ],

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.jade$/, loader: 'jade'},
            {test: /\.css/, loader: 'css-loader'},

            {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
        ],

        noParse: [/angular2-polyfills/]
    },

    ts: {
        configFileName: __dirname + '/tsconfig.json'
    }
}
