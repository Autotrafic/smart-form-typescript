const path = require('path');
const deps = require('./package.json').dependencies;
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_: any, argv: any) => ({
  mode: (process.env.NODE_ENV as 'production' | 'development' | undefined) ?? 'development',

  output: {
    publicPath: argv.mode === 'development' ? 'http://localhost:5100/' : 'https://smart-form-7ewb.onrender.com/',
  },

  resolve: {
    alias: {
      '@modules': path.resolve(__dirname, 'src/modules/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: 5100,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader',
        },
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'smartForm',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './SmartForm': './src/SmartForm.tsx',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({ systemvars: true }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '.' }], // copies all files from 'public' to your output folder
    }),
  ],
});
