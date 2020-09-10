const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'ae_other_casino'),
        filename: 'js/bundle.[hash].js'
    },
    module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
              }
            ]
          },
          {
            test: /\.vue$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'vue-loader',
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    publicPath: '../images',
                    outputPath: './images'
                  }
                }
              ]
            }
        ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/app.[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/ae_other_casino/index.html',
        filename: './index.html'
      }),
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        components: path.join(__dirname, 'src', 'components'),
        event: path.join(__dirname, 'src', 'ae_other_casino'),
      }
    }
}