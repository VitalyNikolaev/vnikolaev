var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/js/app.js', './src/scss/main.scss'],
    output: {
        path: path.join(__dirname,'out'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    "css!sass"
                )
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            THREE: "three",
        }),
        new ExtractTextPlugin('build.css')
    ],
    watch: true
};