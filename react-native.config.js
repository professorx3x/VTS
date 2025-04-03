module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    './src/assets/fonts/', 
    './node_modules/react-native-vector-icons/Fonts/'
  ],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // If using iOS, autolinking should work. Otherwise, set this to `null`
        android: null,
      },
    },
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
