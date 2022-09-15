// this is the file that defines how webpack behaves
const HtmlWebpackPlugin = require("html-webpack-plugin")

// // TODO: recursively import all found html files
// const { readdirSync, lstatSync } = require('fs')

// const htmlFiles = []

// // recurse throught folders, add html files to array, skip the main js
// function getFiles(dir) {
//   const subdirs = readdirSync(dir)
//   subdirs.forEach(subdir => {
//     const filePath =`${dir}/${subdir}`
//     if(lstatSync(filePath).isDirectory()) {
//       getFiles(filePath)
//     } else if (subdir.split('.')[1] === 'html' && filePath != './src/index.html') {
//       htmlFiles.push({ filePath, filename: subdir})
//     }
//   })
// }

// getFiles('./src')

// const htmlPlugins = htmlFiles.map(({ filePath, filename }) => {
//   return new HtmlWebpackPlugin({
//     template: filePath,
//     filename,
//     chunks: [filename],
//     inject: true
//   })
// })

module.exports = {
  // the main index.js file
  entry: "./src/scripts/index.js",
  // can be changed to production for deploy builds
  mode: "development",
  // where to put the webpacked javascript (inside the ./dist is assumed)
  output: {
    filename: "./public/app.bundle.js" 
  },
  plugins: [
    // html packing plugin
    new HtmlWebpackPlugin({
      hash: true,
      // any values can be injected into the html
      title: "Physics",
      pageHeader: "Physics is neat",
      // define the main html file
      template: "./src/index.html",
      // where to put the webpacked html file (./dist is assumed)
      filename: "./index.html",
      chunks: ['main']
    })
  ] /* .concat(htmlPlugins) */,
  module: {
    rules: [
      // defines how to use the css webpack modules
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      // defines how to use babel
      {
      // js or jsx 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ['@babel/preset-react', '@babel/preset-env'] }
        },
      },
      // image loader
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  }
}
