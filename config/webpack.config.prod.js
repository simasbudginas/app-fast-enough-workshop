const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = path.resolve(__dirname, '../src/');

const config = {
    entry: {
        index: './index.js'
    },
    context: appPath,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        browsers: ['last 2 versions', 'ie >= 8']
                                    }
                                }
                            ],
                            'stage-3'
                        ],
                        plugins: [
                            'transform-runtime'
                        ]
                    }
                }]
            },
            {
                resource: {
                    test: /\.css$/i,
                    exclude: /node_modules/
                },
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: 'prod'
        }),
        new UglifyJsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: require('html-webpack-template')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
