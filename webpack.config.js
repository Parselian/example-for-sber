const path = require('path'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin')

const conf = {
  entry: './dev/client',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
    publicPath: "/" //Since webpack 5 it REALLY IMPORTANT to start path with "/" symbol (webpack-dev-server doesnt work without it)
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build')
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dev/client/index.html',
      title: 'Investments'
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
    ]
  }
}

module.exports = (env, options) => {
  const isProd = options.mode === "production"
  conf.devtool = isProd ? false : "eval-cheap-module-source-map"

  return conf
}