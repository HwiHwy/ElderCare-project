const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.js', '.ios.js', '.android.js', '.json'],
    alias: {
      '@Components': './App/Components',
      '@Navigation': './App/Navigation',
      '@Constants': './App/Constants',
      '@Features': './App/Features',
      '@Services': './App/Services',
      '@Fixtures': './App/Fixtures',
      '@Themes': './App/Themes',
      '@Config': './App/Config',
      '@Sagas': './App/Sagas',
      '@Redux': './App/Redux',
      '@Types': './App/Types',
      '@I18n': './App/I18n',
      '@Lib': './App/Lib',
    },
  },
];
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
    presets: ["module:metro-react-native-babel-preset"],
    env: {
      production: {
        plugins: ['ignite-ignore-reactotron', MODULE_RESOLVER],
      },
    },
  };
  
};
