var path = require('path');
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');

module.exports = function(config, env) {
  return Object.assign(
    config,
    override(
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }),
      // add an alias for "our" imports
      addWebpackAlias({
        ['@iso/assets']: path.resolve(__dirname, 'src/assets'),
        ['@iso/components']: path.resolve(__dirname, 'src/components'),
        ['@iso/config']: path.resolve(__dirname, 'src/config'),
        ['@iso/containers']: path.resolve(__dirname, 'src/containers'),
        ['@iso/redux']: path.resolve(__dirname, 'src/redux'),
        ['@iso/lib']: path.resolve(__dirname, 'src/library'),
        ['@iso/ui']: path.resolve(__dirname, 'src/UI'),
      })
    )(config, env)
  );
};
