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
        host: 'localhost',
        open: true,
        historyApiFallback: true,
        historyApiFallback: {
          rewrites: [
              { from: /^\/$/, to: '/views/index.ejs' },
              { from: /^\/page-item/, to: '/views/page-item.ejs' },
          ],
      },
    }

});
