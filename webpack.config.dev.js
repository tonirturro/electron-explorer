const path = require("path");
const merge = require('webpack-merge');
const rules = require('./webpack.config.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge( rules, {
    entry: './src/frontend/main.js',
    output: {
        filename: 'frontend.js',
        path: path.resolve(__dirname, 'app')
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/frontend/index.html', to: 'index.html' }
        ], {
            copyUnmodified: true 
        })
    ]
});