var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },

    module: {
        preLoaders: [
            {test: /\.ts$/, loader: 'tslint', exclude: "node_modules"}
        ]
    },

    plugins: [new HtmlWebpackPlugin({
        template: __dirname + '/index.html',
        inject: 'body',

        title: 'Project'
    })],

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.css$/, loader: 'css-loader'},
            {test: /\.jade$/, loader: 'jade'},

            {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
        ]
    },

    ts: {
        configFileName: __dirname + '/tsconfig.json'
    }
}
