module.exports = function (api) {
  api.cache(true);

  const presets = ['next/babel'];
  const plugins = [
    ['styled-components'],
    [
      'import',
      { libraryName: 'antd', libraryDirectory: 'lib', style: 'index.css' },
    ],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'lib/icons',
        camel2DashComponentName: false,
      },
      '@ant-design/icons',
    ],
  ];

  return {
    presets,
    plugins,
  };
};
