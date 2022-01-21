module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:fsd/all',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': [
      'error',
      {
        enforceInMethodNames: false,
        allowAfterThis: true,
        allowAfterSuper: true,
      },
    ],
  },
};
