const path = require('path');
const nodeExternals = require("webpack-node-externals")

module.exports = {
    target: "node",
    entry: './src/index.ts',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      library: 'core',
      filename: 'index.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'lib'),
      globalObject: 'this',
  },
};