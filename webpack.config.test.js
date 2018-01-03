const path = require("path");
const merge = require('webpack-merge');
const rules = require('./webpack.config.base');

module.exports = merge( rules, {
    entry: './test/test.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'test/bundle')
    }
});