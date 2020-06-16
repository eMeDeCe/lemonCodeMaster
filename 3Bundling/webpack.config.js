const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer : {
    port: 8080
  },
  entry: {
    app: ["./pets.js", "./index.jsx"],
    appStyles: ["./mystyles.scss"],
    vendorStyles: ["../node_modules/bootstrap/dist/css/bootstrap.css"]
  },

  output: {
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: './img/[hash].[name].[ext]',
            },
          },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
                modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
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
    })
  ]
};