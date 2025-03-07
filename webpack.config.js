const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const metaConfig = require('./meta.config');

module.exports = (env, options) => {
  const devMode = options.mode === 'development';

  process.env.NODE_ENV = options.mode;

  return {
    mode: options.mode,
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './build'),
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      clean: true,
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        // '@components': path.resolve(__dirname, 'src/components/'),
        // '@constants': path.resolve(__dirname, 'src/constants/'),
        // '@hooks': path.resolve(__dirname, 'src/hooks/'),
        // '@services': path.resolve(__dirname, 'src/services/'),
        // '@store': path.resolve(__dirname, 'src/store/'),
        // '@styles': path.resolve(__dirname, 'src/styles/'),
        // '@utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/i,
          // include: path.resolve(__dirname, 'src'),
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
        // {
        //     test: /\.(woff|woff2|ttf|eot)$/,
        //     loader: "file-loader",
        //     options: {
        //         name: '[name].[contenthash].[ext]',
        //     }
        // },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
        },
        // {
        //     test: /\.(png|jpg|gif|svg)$/,
        //     loader: "file-loader",
        //     options: {
        //         name: '[name].[contenthash].[ext]',
        //     }
        // },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
      }),
      // copy static files from public folder to build directory
      new CopyPlugin({
        patterns: [
          {
            from: 'public/**/*',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        title: metaConfig.title,
        meta: metaConfig.meta,
        minify: {
          html5: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: false,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributese: true,
          useShortDoctype: true,
        },
      }),
      // !devMode ? new CleanWebpackPlugin() : false,
      !devMode ? new BundleAnalyzerPlugin() : false,
    ].filter(Boolean),
    optimization: {
      // splitChunks: {
      //     cacheGroups: {
      //         // vendor chunk
      //         vendor: {
      //             // sync + async chunks
      //             chunks: 'all',
      //             name: 'vendor',
      //             // import file path containing node_modules
      //             test: /node_modules/
      //         }
      //     }
      // },
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
  };
};
