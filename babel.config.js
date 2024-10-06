module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'], // Adjust this path if your root directory is different
          alias: {
            '@hooks': './hooks',
            '@RNComponents': './components/RNComponents',
            '@assets': './assets',
            '@components': './components',
            '@backend': './backend',
            '@custom_list': './components/custom_list',
            '@icons': './assets/dummy/icons_pictures',

             // Add more aliases as needed
          },
        },
      ],
    ],
  };
};