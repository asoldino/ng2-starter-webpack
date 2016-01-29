var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },

    module: {
        preLoaders: [
            {test: /\.ts$/, loader: 'tslint'}
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
            {test: /\.jade$/, loader: 'jade'}
        ]
    },

    ts: {
        configFileName: __dirname + '/tsconfig.json'
    }
}
