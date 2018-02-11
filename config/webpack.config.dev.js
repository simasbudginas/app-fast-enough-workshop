const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
    resolve: {
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules',
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        host: '0.0.0.0',
        port: 9999,
        disableHostCheck: true
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
            },
            {
                test: /\.html$/i,
                use: [{
                    loader: 'raw-loader',
                    options: {
                        context: path.resolve(__dirname, '../dist')
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: 'dev'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: require('html-webpack-template')
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        new WebpackPwaManifest({
            name: 'Paysera FastEnough Workshop',
            short_name: 'FastEnough?',
            background_color: '#007bff',
            start_url: '/index.html',
            display: 'fullscreen',
            orientation: 'portrait',
            icons: [
                {
                    src: path.resolve('src/icons/icon.png'),
                    size: '144x144',
                }
            ],
        }),
        new OfflinePlugin({
            safeToUseOptionalCaches: true,
            caches: {
                main: [
                    ':rest:'
                ],
                additional: [
                    ':externals:',
                ],
            },
            externals: [
                '../',
                '../manifest.json',
            ],
            responseStrategy: 'network-first',
        })
    ]
};

module.exports = config;
