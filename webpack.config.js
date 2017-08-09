var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        iframeloader: './src/app.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        library: 'iframeloader',
        libraryTarget: 'var',
        publicPath: '/assets',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({})
    ],
    devServer: {
        port: 9000,
        https: true,
        inline: false,
        compress: true,
        watchContentBase: true,
        contentBase: path.resolve(__dirname, './src'),
        proxy: {
            "/rest": {
                "target": "https://wiki.hybris.com/",
                "secure": false,
                "changeOrigin": true,
                "logLevel": "debug"
            }
        }
    },
};