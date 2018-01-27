import typescriptPlugin from 'rollup-plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    file: 'lib/index.umd.js',
    name: 'koalats',
    format: 'umd',
    sourcemap: true,
    exports: 'named',
  },
  plugins: [
    typescriptPlugin({  
      typescript: require('typescript'),
    }),
  ]
};
