const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'eval',

    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },

    devServer: {
        // contentBase: path.join(__dirname, 'assets'),
        host: 'localhost',
        open: true,
        historyApiFallback: {
          rewrites: [
              { from: /^\/$/, to: '/views/index.ejs' },
              { from: /^\/page-item/, to: '/views/page-item.ejs' },
          ],
      },
    }

});
