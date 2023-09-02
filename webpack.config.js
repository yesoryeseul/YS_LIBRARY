const path = require('path');

module.exports = {
  // ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // tsconfig.json의 baseUrl과 일치해야 합니다.
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  // ...
};