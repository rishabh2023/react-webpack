const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: { publicPath: "http://localhost:3000/" },

  resolve: { extensions: [".tsx", ".ts", ".jsx", ".js", ".json"] },

  devServer: { port: 3000, historyApiFallback: true },

  module: {
    rules: [
      {
        test: /.m?js/,
        type: "javascript/auto",
        resolve: { fullySpecified: false },
      },
      {
        test: /.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      filename: "./index.html",
      manifest: "./public/manifest.json",
    }),
    new InterpolateHtmlPlugin({ PUBLIC_URL: "static" }),
  ],
};
