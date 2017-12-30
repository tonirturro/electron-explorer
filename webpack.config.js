const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'electron-renderer',
    entry: './src/frontend/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/frontend')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/frontend/index.html', to: 'index.html' }
        ], {
            copyUnmodified: true 
        })
    ],
    devtool: 'inline-source-map'
};