const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'electron-main',
    entry: '',
    output: {
        filename: '',
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