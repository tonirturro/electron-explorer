const path = require("path");
const merge = require('webpack-merge');
const rules = require('./webpack.config.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'electron-main',
    entry: './src/backend/main.js',
    output: {
        filename: 'backend.js',
        path: path.resolve(__dirname, 'app')
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/backend/package.json', to: 'package.json' }
        ], {
            copyUnmodified: true 
        })
    ],
    devtool: 'inline-source-map'
};