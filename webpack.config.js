const path = require('path');

module.exports = {
    target: 'electron-renderer',
    entry: './src/frontend/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/frontend')
    },
    devtool: 'inline-source-map'
};