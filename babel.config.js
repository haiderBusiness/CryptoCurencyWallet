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
            '@backend': './backend',
            '@custom_list': './components/custom_list'

             // Add more aliases as needed
          },
        },
      ],
    ],
  };
};