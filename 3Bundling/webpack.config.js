const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: [
           // "./students.js",
            "./pets.js"   
        ],
        appStyles: ["./mystyles.css"],
        vendorStyles: ['./node_modules/bootstrap/dist/css/bootstrap.css']
      },
    
      output: {
        filename: "[name].[chunkhash].js"
      },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
       // exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
        ]
      }
    ]
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html" //Name of template in ./src
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ]
};