const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/public"),
    filename: "js/index.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/i,
        include: path.resolve(__dirname, "./src"),
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                url: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer({
                    grid: "autoplace"
                  }),
                  cssnano({
                    preset: ['default', {
                      discardComments: {
                        removeAll: true,
                      },
                    }]
                  })
                ]
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: "img",
              useRelativePath: true,
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new ExtractTextPlugin({
      filename: "./css/style.css",
      allChunks: true,
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {},
        mangle: true, // Note `mangle.properties` is `false` by default.
        output: null,
        toplevel: true,
        nameCache: null,
        ie8: false,
        keep_fnames: false,
      },
    })],
  }
};