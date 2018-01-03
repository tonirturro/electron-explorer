const path = require("path");
const merge = require('webpack-merge');
const rules = require('./webpack.config.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge( rules, {
    entry: './src/frontend/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/frontend')
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/frontend/index.html', to: 'index.html' }
        ], {
            copyUnmodified: true 
        })
    ]
});