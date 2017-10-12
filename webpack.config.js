const path = require('path')
module.exports={
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: "js/[name].min.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve("src")],
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}