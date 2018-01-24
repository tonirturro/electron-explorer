const path = require("path");
const merge = require('webpack-merge');
const base = require('./base.frontend');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge( base, {
    target: 'electron-renderer',
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/frontend/index.html', to: 'index.html' }
        ], {
            copyUnmodified: true 
        })
    ]
});