const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

require('dotenv').config()


const APP_DIR = path.join(__dirname, 'src')

const plugins = [
  new HtmlWebPackPlugin({
    template: `${APP_DIR}/index.html`
  }),
  new CleanWebpackPlugin()
]

const {
    PORT: port,
    NODE_ENV: mode
  } = process.env
  
  const devServer = {
    port,
    open: true
  }
  


module.exports = {
    mode,
    devServer,
    plugins,
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              "plugins": [
                ["@babel/transform-runtime"]  
              ] 
            }
          }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
      ]
    }
  }