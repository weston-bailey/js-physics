// this is the file that defines how webpack behaves
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // the main index.js file
  entry: "./src/scripts/index.js",
  // can be changed to production for deploy builds
  mode: 'development',
  // where to put the webpacked javascript (inside the ./dist is assumed)
  output: {
    filename: "./public/app.bundle.js" 
  },
  plugins: [
    // html packing plugin
    new HtmlWebpackPlugin({
      hash: true,
      // any values can be injected into the html
      title: 'Custom Page Title',
      PageHeader: 'Hello World',
      // define the main html file
      template: './src/index.html',
      // where to put the webpacked html file (./dist is assumed)
      filename: './index.html' 
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}