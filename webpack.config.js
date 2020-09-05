const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'view'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
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
            test: /\.vue$/,
            exclude: /(node_modules|bower_components)/,
              loader: 'vue-loader',
          },
        ],
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
      }
    }
}