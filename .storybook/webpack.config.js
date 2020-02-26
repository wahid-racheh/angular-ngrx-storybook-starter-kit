const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ config }) => {
  // replace `TsconfigPathsPlugin` instace with new one with proper tsconfig path
  /* const tsconfigPathsPluginIndex = config.resolve.plugins.findIndex(plugin => plugin instanceof TsconfigPathsPlugin);
  if (tsconfigPathsPluginIndex !== -1) {
    config.resolve.plugins[tsconfigPathsPluginIndex] = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, './tsconfig.json'),
    });
  } */
  return config;
};
