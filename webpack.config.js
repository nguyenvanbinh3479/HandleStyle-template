const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join('src', 'app');
const dirAssets = path.join('src', 'assets');

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        bundle: './src/app/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/assets/'
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),

        new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),

        new MiniCssExtractPlugin({
            filename: path.join('assets', 'styles', 'styles.css')
        }),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        new HtmlWebpackPlugin({
            template: path.join('src', 'views', 'index.ejs'),
            filename: 'index.html',
            hash: true,
        }),

        new HtmlWebpackPlugin({
          template: path.join('src', 'views', 'page-item.ejs'),
          filename: 'page-item.html',
          hash: true,
        }),

        new HtmlWebpackPlugin({
          template: path.join('src', 'views', 'sign-in.ejs'),
          filename: 'sign-in.html',
          hash: true,
        }),

        new HtmlWebpackPlugin({
          template: path.join('src', 'views', 'register.ejs'),
          filename: 'register.html',
          hash: true,
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'index.ejs'),
        //     title: appHtmlTitle
        // }),
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // HTML

            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader?interpolate=require'
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },


            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
